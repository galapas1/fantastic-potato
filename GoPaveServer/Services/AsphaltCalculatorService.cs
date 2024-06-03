using GoPaveServer.Calculators;
using GoPaveServer.Utils;
using GoPaveServer.Models;
using System.Collections.Generic;
using System;
using System.Diagnostics;
using System.Linq;
using System.IO;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Http;

namespace GoPaveServer.Services
{
    public class AsphaltCalculatorService
    {
        public static AsphaltAnalysisResponse CalculateAsphaltAnalysis(AsphaltAnalysisRequest request)
        {
            if(request == null)
            {
                throw new ArgumentException("malformed request");
            }

            request.Validate();

            AsphaltAnalysisResponse response = new AsphaltAnalysisResponse();

            double ConvertToInches = 1.0,
                   ConvertToKips   = 1.0,
                   ConvertToPSI    = 1.0;

            if (request.ConvertToMetric)
            {
                ConvertToInches = 0.0393700787;
                ConvertToKips   = 0.224808943;
                ConvertToPSI    = 145.0377;
//              ConvertToPSIIN  = 3.683958;
            }

            response.dStructuralNumber = 0.0;

            for(int indx = 0; indx < request.NumLayerCoefficient(); ++indx)
            {
                request.LayerThickness[indx] *= ConvertToInches;
                response.dStructuralNumber =
                    response.dStructuralNumber +
                    (
                        (
                            request.LayerCoefficient   [indx] *
                            request.DrainageCoefficient[indx] *
                            request.LayerThickness     [indx]
                        ) / ConvertToInches
                    );
            }

            double rel1 = 0.0, z1 = 0.0,
                   rel2 = 0.0, z2 = 0.0;

            Utils.Calculators.getNormalDeviateDeterminationBasedOnReliability(request.Reliability,
                                                                              out rel1, out rel2,
                                                                              out z1,   out z2);

            double r = (request.Reliability - rel1) / (rel2 - rel1);
            double zr = z1 + (r * (z2 - z1));

            double StructuralNumberInInches = response.dStructuralNumber * ConvertToInches;
            double SubgradeResilientModulusInPSI = request.SubgradeResilientModulus * ConvertToPSI;

            response.dFlexibleEsals = Math.Pow(10.0,
                zr * request.OverallStandardDeviation + 9.36 *
                Math.Log10(StructuralNumberInInches + 1.0) - 0.2 +
                (
                    Math.Log10((request.InitialServiceability - request.TerminalServiceability) / 2.7)
                ) / (0.4 + 1094.0 / Math.Pow(StructuralNumberInInches + 1.0, 5.19)) + 2.32
                  * (Math.Log10(SubgradeResilientModulusInPSI)) - 8.07);

            response.dFractionalEsalSingle = response.dFractionalEsalTandem = response.dFractionalEsalTridem = 0.0;
            for (int indx = 0; indx < 10; ++indx)
            {
                if (indx < request.NumSingleAxles())
                {
                    request.SingleAxleWeight[indx] *= ConvertToKips;
                    response.dFractionalEsalSingle +=
                        Utils.Calculators.calculateFractionalESAL
                        (
                            1,
                            StructuralNumberInInches,
                            request.TerminalServiceability,
                            request.SingleAxleWeight[indx],
                            request.SingleAxlesPer1000[indx],
                            response.dFractionalEsalSingle
                        );
                }
                if (indx < request.NumTandemAxles())
                {
                    request.TandemAxleWeight[indx] *= ConvertToKips;
                    response.dFractionalEsalTandem +=
                        Utils.Calculators.calculateFractionalESAL
                        (
                            2,
                            StructuralNumberInInches,
                            request.TerminalServiceability,
                            request.TandemAxleWeight[indx],
                            request.TandemAxlesPer1000[indx],
                            response.dFractionalEsalTandem
                        );
                }
                if (indx < request.NumTridemAxles())
                {
                    request.TridemAxleWeight[indx] *= ConvertToKips;
                    response.dFractionalEsalTridem +=
                        Utils.Calculators.calculateFractionalESAL
                        (
                            3,
                            StructuralNumberInInches,
                            request.TerminalServiceability,
                            request.TridemAxleWeight[indx],
                            request.TridemAxlesPer1000[indx],
                            response.dFractionalEsalTridem
                        );
                }
            }
            response.TotalTrucks = (int)Math.Round((response.dFlexibleEsals * 1000) /
            (
                response.dFractionalEsalSingle + response.dFractionalEsalTandem + response.dFractionalEsalTridem
            ));
            response.AverageTrucks = (int)Math.Round(response.TotalTrucks /
            (
                request.DesignLife * 365.25
            ));
            return response;
        }

        public static object CompositeWithAsphaltSurfaceUsingIncrementalThickness(CompositeAsphaltRequest request, HttpContext httpContext = null)
        {
            request.Validate();
            CompositeAsphaltResponse response = null;

            const double iteration = 0.5;
            bool done = false;
            for(double surfaceThickness = 1.0; !done; surfaceThickness += iteration)
            {
                response = CompositeWithAsphaltSurfaceAnalysis(request, surfaceThickness);

                done = true;
                for(int indx = 0; indx < response.lawinresult.nequ; indx++)
                {
                    if(response.lifepredict[indx, Convert.ToInt16(response.designyear) - 1] < request.AllowableDamagePerLayer)
                    {
                        // so far so good, move to next layer...
                    }
                    else
                    {
                        done = false;
                        Program.Trace("Not done for surfaceThickness: " + surfaceThickness);
                        break; // iterate surfaceThickness again as Total Predicted Damage over the Design Life
                               // for all layers is not less than the user-entered ‘Allowable Damage per Layer’
                    }
                }
                if(null != httpContext)
                {
                    if(httpContext.RequestAborted.IsCancellationRequested)
                    {
                        throw new SystemException("http request aborted");
                    }
                }
                response.SurfaceThicknessDesign=surfaceThickness;
            }
            return CompositeWithAsphaltSurfaceFormatResponse(response, request);
        }

        public static CompositeAsphaltResponse CompositeWithAsphaltSurfaceAnalysis(CompositeAsphaltRequest request, double surfaceLayerThickness = 4.0)
        {
            string baseFilename = System.IO.Path.GetTempFileName();
            try {
                File.Delete(baseFilename);
            } catch(Exception) {}

            string[] args = new string[3];
            args[0] = baseFilename.Replace(".tmp", ".COO");
            args[1] = baseFilename.Replace(".tmp", ".txt");
            args[2] = "TTIWentingLiu5154480Str";

            CompositeAsphaltResponse response = new CompositeAsphaltResponse(args[0], baseFilename.Replace(".tmp", "-{0}.dat"));
            response.designyear       = request.DesignLife;
            response.myweaslea.nsys   = 30;
            response.myweaslea.nlayer = request.NumberSubLayers + 3;
            response.myweaslea.ib1    = 1;
            response.myweaslea.ib2    = 1;

            int indx = 0; int locIndx = 0; int forWhat = 0;

            // Surface Layer details
            response.myweaslea.mod    [indx] = request.SurfaceLayerModulusOfElasticity;
            response.myweaslea.pos    [indx] = request.SurfaceLayerPoissonsRatio;
            response.myweaslea.thick  [indx] = surfaceLayerThickness;
            response.myweaslea.oth    [indx] = 0.0;
            response.myweaslea.inlayer[indx] = indx + 1;
            response.myweaslea.kind   [indx] = 2;
            response.myweaslea.name   [indx] = request.SurfaceLayerTypeName;

            if(isCountedAnalysisLayer(response.myweaslea.name[0], out forWhat))
            {
                response.lawinresult.nequ++;
                response.lawinresult.anaequ[locIndx].typeid      = forWhat;
                response.lawinresult.anaequ[locIndx].iniparameters();
                response.lawinresult.anaequ[locIndx].MR          = 0.0;
                response.lawinresult.anaequ[locIndx].E           = request.SurfaceLayerModulusOfElasticity;
                response.lawinresult.anaequ[locIndx].application = 1000;
                response.lawinresult.anaequ[locIndx].inlayer     = indx;
                ++locIndx;
            }
            ++indx;

            // Subbase Layer details
            for( ; indx < request.NumberSubLayers+1; indx++)
            {
                response.myweaslea.mod    [indx] = request.SubbaseLayerDetails[indx-1].ModulusOfElasticity;
                response.myweaslea.pos    [indx] = request.SubbaseLayerDetails[indx-1].PoissonsRatio;
                response.myweaslea.thick  [indx] = request.SubbaseLayerDetails[indx-1].LayerThickness;
                response.myweaslea.oth    [indx] = 0.0;
                response.myweaslea.inlayer[indx] = indx + 1;
                response.myweaslea.kind   [indx] = 1;
                response.myweaslea.name   [indx] = request.SubbaseLayerDetails[indx-1].LayerTypeName;

                if(isCountedAnalysisLayer(response.myweaslea.name[indx], out forWhat))
                {
                    response.lawinresult.nequ++;
                    response.lawinresult.anaequ[locIndx].typeid      = forWhat;
                    response.lawinresult.anaequ[locIndx].iniparameters();
                    response.lawinresult.anaequ[locIndx].application = 1000;
                    response.lawinresult.anaequ[locIndx].MR          = request.SubbaseLayerDetails[indx-1].ModulusOfRupture;
                    response.lawinresult.anaequ[locIndx].E           = request.SubbaseLayerDetails[indx-1].ModulusOfElasticity;
                    response.lawinresult.anaequ[locIndx].inlayer     = indx;
                    ++locIndx;
                }
            }

            // Subgrade Layer details
            response.myweaslea.mod    [indx] = request.SubgradeModulusOfElasticity;
            response.myweaslea.pos    [indx] = request.SubgradePoissonsRatio;
            response.myweaslea.thick  [indx] = request.ThicknessToRigidFoundation;
            response.myweaslea.oth    [indx] = 0.0;
            response.myweaslea.inlayer[indx] = indx + 1;
            response.myweaslea.kind   [indx] = 1;
            response.myweaslea.name   [indx] = "Soil";
            response.lawinresult.nequ++;
            response.lawinresult.anaequ[locIndx].typeid      = 8;
            response.lawinresult.anaequ[locIndx].iniparameters();
            response.lawinresult.anaequ[locIndx].MR          = 0.0;
            response.lawinresult.anaequ[locIndx].E           = request.SubgradeModulusOfElasticity;
            response.lawinresult.anaequ[locIndx].application = 1000;
            response.lawinresult.anaequ[locIndx].inlayer     = indx;
            ++locIndx;

            // Foundation Layer details
            ++indx;
            response.myweaslea.mod    [indx] = 5000000.00;
            response.myweaslea.pos    [indx] = 0.15;
            response.myweaslea.thick  [indx] = 1.0;
            response.myweaslea.oth    [indx] = 1.0;
            response.myweaslea.inlayer[indx] = indx + 1;
            response.myweaslea.kind   [indx] = 0;
            response.myweaslea.name   [indx] = "Rigid Layer";

            double axleloadfinal;

            indx = 0;
            for(int iindx = 0; iindx < request.TrafficSummaryDetails.SingleAxleItems.Length; iindx++)
            {
                axleloadfinal = request.TrafficSummaryDetails.SingleAxleItems[iindx].AxleLoad;
                if(request.TrafficSummaryDetails.SingleAxleItems[iindx].AxleLoad <=0.0 ||
                        request.TrafficSummaryDetails.SingleAxleItems[iindx].AxlesPer1000 <=0.0)
                {
                    axleloadfinal = 0.01;
                }

                response.axinresult.inputaxis[indx++] = new Axis() {
                    nload    = 1,
                    //load     = 1000.0 * (request.TrafficSummaryDetails.SingleAxleItems[iindx].AxleLoad / 2.0),
                    //loadarea = Math.Sqrt(1000.0 * request.TrafficSummaryDetails.SingleAxleItems[iindx].AxleLoad / 100.0 / 3.14159 / 2.0),
                    load     = 1000.0 * (axleloadfinal / 2.0),
                    loadarea = Math.Sqrt(1000.0 * axleloadfinal / 100.0 / 3.14159 / 2.0),
                    loadx    = new double[] { 0.0 },
                    loady    = new double[] { 0.0 },
                    //application = request.AverageTrucksPerDayInDesignLaneOverDesignLife,
                    application = (request.AverageTrucksPerDayInDesignLaneOverDesignLife/1000)*request.TrafficSummaryDetails.SingleAxleItems[iindx].AxlesPer1000,
                };
            }
            for(int iindx = 0; iindx < request.TrafficSummaryDetails.TandemAxleItems.Length; iindx++)
            {
                axleloadfinal = request.TrafficSummaryDetails.TandemAxleItems[iindx].AxleLoad;
                if(request.TrafficSummaryDetails.TandemAxleItems[iindx].AxleLoad <= 0.0 ||
                        request.TrafficSummaryDetails.TandemAxleItems[iindx].AxlesPer1000 <= 0.0)
                {
                   axleloadfinal = 0.01;
                }

                response.axinresult.inputaxis[indx++] = new Axis() {
                    nload    = 4,
                    //load     = 1000.0 * (request.TrafficSummaryDetails.TandemAxleItems[iindx].AxleLoad / 8.0),
                    //loadarea = Math.Sqrt(1000.0 * request.TrafficSummaryDetails.TandemAxleItems[iindx].AxleLoad / 100.0 / 3.14159 / 8.0),
                    load     = 1000.0 * (axleloadfinal / 8.0),
                    loadarea = Math.Sqrt(1000.0 * axleloadfinal / 100.0 / 3.14159 / 8.0),
                    loadx    = new double[] {   7.0, -7.0,   7.0, -7.0 },
                    loady    = new double[] { -26.5, 26.5, -26.5, 26.5 },
                    //application = request.AverageTrucksPerDayInDesignLaneOverDesignLife,
                    application = (request.AverageTrucksPerDayInDesignLaneOverDesignLife/1000)*request.TrafficSummaryDetails.TandemAxleItems[iindx].AxlesPer1000,
                };
            }
            for(int iindx = 0; iindx < request.TrafficSummaryDetails.TridemAxleItems.Length; iindx++)
            {
                axleloadfinal = request.TrafficSummaryDetails.TridemAxleItems[iindx].AxleLoad;
                if(request.TrafficSummaryDetails.TridemAxleItems[iindx].AxleLoad <= 0.0 ||
                        request.TrafficSummaryDetails.TridemAxleItems[iindx].AxlesPer1000 <= 0.0)
                {
                    axleloadfinal = 0.01;
                }

                response.axinresult.inputaxis[indx++] = new Axis() {
                    nload    = 6,
                    //load     = 1000.0 * (request.TrafficSummaryDetails.TridemAxleItems[iindx].AxleLoad / 12.0),
                    //loadarea = Math.Sqrt(1000.0 * request.TrafficSummaryDetails.TridemAxleItems[iindx].AxleLoad / 100.0 / 3.14159 / 12.0),
                    load     = 1000.0 * (axleloadfinal / 12.0),
                    loadarea = Math.Sqrt(1000.0 * axleloadfinal / 100.0 / 3.14159 / 12.0),
                    loadx    = new double[] {   7.0, -7.0,  7.0,  -7.0, 7.0, -7.0, 7.0, -7.0 },
                    loady    = new double[] { -53.0,  0.0, 53.0, -53.0, 0.0, 53.0  },
                    //application = request.AverageTrucksPerDayInDesignLaneOverDesignLife,
                    application = (request.AverageTrucksPerDayInDesignLaneOverDesignLife/1000)*request.TrafficSummaryDetails.TridemAxleItems[iindx].AxlesPer1000,
                };
            }

            try {
                response.preparedata();
            }
            catch(Exception ex)
            {
                throw new SystemException("failed to prep data, " + ex.Message);
            }

            ProcessStartInfo psi = new ProcessStartInfo()
            {
                FileName               = @"tools/strbis.exe",
                Arguments              = string.Join(" ", args),
                UseShellExecute        = false,
                RedirectStandardError  = true,
                RedirectStandardOutput = true
            };

            Process proc = new Process() {
                StartInfo = psi
            };

            try {
                proc.Start();
            } catch(Exception ex) {
                Program.Trace("failed to execute process, " + ex.Message);
                args[1] = @"tools/test-data.txt";
                //throw new SystemException("failed to execute process, " + ex.Message);
            }

            try {
                Program.Trace("   reading stderr, " + proc.StandardError.ReadToEnd().ToString());
            } catch(Exception ex) {
                Program.Trace("failed to read from StandardError, " + ex.Message);
            }

            try {
                Program.Trace("   reading stdout, " + proc.StandardOutput.ReadToEnd());
            } catch(Exception ex) {
                Program.Trace("failed to read from StandardOut, " + ex.Message);
            }

            // there 'may' not be a process to wait for...
            try {
                proc.WaitForExit();
            } catch(Exception ex) {
                Program.Trace("wait for exit failure, " + ex.Message);
            }

            AsphaltResult[] results = response.ReadResults(args[1]);

            bool doCleanUp = false; // Andy, set to false to debug the input/output files
            if(doCleanUp)
            {
                string baseFname = baseFilename.Replace(".tmp", "");
                string directory = Path.GetDirectoryName(args[1]);
                foreach(var file in Directory.GetFiles(directory))
                {
                    if(file.Contains(baseFname))
                    {
                        try {
                            File.Delete(file);
                        } catch(Exception) {}
                    }
                }
            }
            else Program.Trace("    --> Output File: " + args[1]);

            response.myoneout = results;
            if(results != null)
            {
                response.AxleAnalysis();
                response.FindStatic  ();
                response.AnalysisPrediction(request.AllowableDamagePerLayer);
            } else Program.Trace("   missing results!");
            Program.Trace("DONE CompositeWithAsphaltSurfaceAnalysis");
            return response;
        }

        public static object CompositeWithAsphaltSurface(CompositeAsphaltRequest request)
        {
            request.Validate();
            CompositeAsphaltResponse response = CompositeWithAsphaltSurfaceAnalysis(request, request.SurfaceLayerThickness);
            return CompositeWithAsphaltSurfaceFormatResponse(response, request);
        }

        public static object CompositeWithAsphaltSurfaceFormatResponse(CompositeAsphaltResponse response, CompositeAsphaltRequest request)
        {
            double SurfaceThickness = response.SurfaceThicknessDesign;
            double DesignLife = response.designyear;
            string[] LayerNames = response.myweaslea.name;
            double[] TotalDamage  = new double[response.lawinresult.nequ];
            double[]   LifeByFail = new double[response.lawinresult.nequ];
            double[,] LifePredict = new double[response.lawinresult.nequ, Convert.ToInt16(response.designyear+10)];

            for(int indx = 0; indx < response.lawinresult.nequ; indx++)
            {
                TotalDamage[indx] = response.Final_static_res[indx].totaldamage;
                LifeByFail [indx] = response.lifebyfail[indx];
                for(int iindx = 0; iindx < response.designyear+10; iindx++)
                {
                    LifePredict[indx, iindx] = Math.Round(response.lifepredict[indx, iindx],2);
                }
            }

            Dictionary<string, object> responseDetails = new Dictionary<string, object>() {
                { "SurfaceThickness",                             SurfaceThickness },
                { "SurfaceLayerThickness",                        SurfaceThickness },
                { "DesignLife",                                   DesignLife  },
                { "LayerNames",                                   LayerNames  },
                { "PercentPredictedDamageByAnalysisLayerAndYear", LifePredict },
                { "YearCalculatedDamageEqualsAllowableDamage",    LifeByFail  }
            };

            return new {
                responseDetails,
              //  ApiDebugInfo = new { // TODO: remove this when it is no longer useful to Swagger
              //      CalculationData = response,
              //      OriginalRequest = request
              //  }
            };
        }

        private static bool isCountedAnalysisLayer(string layerName, out int forWhat)
        {
            forWhat = 0;
            switch(layerName.Substring(0, 3))
            {
                case "HMA":
                    forWhat = 9;
                    break;
                case "BST":
                    forWhat = 0;
                    break;
               case "Rol":
                    forWhat = 5;
                    break;
                case "Cem":
                    forWhat = layerName.Contains("Subgrade") ? 3 : 1;
                    break;
                case "Ful":
                    forWhat = 1;
                    break;
                case "Lea":
                    forWhat = 1;
                    break;
                case "Hot":
                    forWhat = 9;
                    break;
                case "Bit":
                    forWhat = 9;
                    break;
            }
            return (forWhat > 0);
        }
    }
}

