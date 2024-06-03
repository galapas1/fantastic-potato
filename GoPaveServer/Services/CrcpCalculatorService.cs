using GoPaveServer.Calculators;
using GoPaveServer.Models;
using GoPaveServer.Utils;
using System;
using Newtonsoft.Json;

namespace GoPaveServer.Services
{
    public class CrcpCalculatorService
    {
        public static CrcpThicknessResponse CalculateCrcpThickness(CrcpThicknessRequest request)
        {
            if(request == null)
            {
                throw new ArgumentException("malformed request");
            }

            request.Validate();

            double thicknessDesign = 5.99;

            double ConvertToInches = 1.0,
                   ConvertToKips   = 1.0,
                   ConvertToPSI    = 1.0,
                   ConvertToPSIIN  = 1.0;

            double dbCompositeKValueOfSubstructure;
            double dbModulusOfElasticity;
            double dbFlexuralStrength;          

            CrcpThicknessResponse response = new CrcpThicknessResponse();
            response.TotalTruckDamage     = 1.0;
            response.AllowableTruckDamage = 0.0;

            if (request.ConvertToMetric)
            {
                ConvertToInches = 0.0393700787;
                ConvertToKips   = 0.224808943;
                ConvertToPSI    = 145.0377;
                ConvertToPSIIN  = 3.683958;
            }

            dbCompositeKValueOfSubstructure = request.CompositeKValueOfSubstructure * ConvertToPSIIN;
            dbModulusOfElasticity =  request.ModulusOfElasticity * ConvertToPSI;
            dbFlexuralStrength = request.FlexuralStrength * ConvertToPSI;

            double totalTrucksConst = request.TotalTrucksInDesignLaneOverDesignLife / 1000.0;
            double singleaxleweight;
            double tandemaxleweight;
            double tridemaxleweight;
            
            while (response.TotalTruckDamage > response.AllowableTruckDamage)
            {
                thicknessDesign = thicknessDesign + 0.01;
                response.RigidEsalSingle  = 0;
                response.RigidEsalTandem  = 0;
                response.RigidEsalTridem  = 0;

                int[] numSingleAxles = new int[request.NumSingleAxles()],
                      numTandemAxles = new int[request.NumTandemAxles()],
                      numTridemAxles = new int[request.NumTridemAxles()];

                for (int indx = 0; indx < request.NumSingleAxles(); ++indx)
                {
                    if (indx < request.NumSingleAxles())
                    {
                        singleaxleweight = request.SingleAxleWeight[indx] * ConvertToKips;
                        numSingleAxles[indx] = (int)Math.Ceiling(totalTrucksConst * request.SingleAxlesPer1000[indx]);

                        response.RigidEsalSingle +=
                            Utils.Calculators.calculateRigidESAL(1,
                                                request.TerminalServiceability,
                                                thicknessDesign,
                                                singleaxleweight,
                                                numSingleAxles[indx]);
                    }
                    if (indx < request.NumTandemAxles())
                    {
                        tandemaxleweight = request.TandemAxleWeight[indx] * ConvertToKips;
                        numTandemAxles[indx] = (int)Math.Ceiling(totalTrucksConst * request.TandemAxlesPer1000[indx]);

                        response.RigidEsalTandem +=
                            Utils.Calculators.calculateRigidESAL(2,
                                                request.TerminalServiceability,
                                                thicknessDesign,
                                                tandemaxleweight,
                                                numTandemAxles[indx]);
                    }
                    if (indx < request.NumTridemAxles())
                    {
                        tridemaxleweight = request.TridemAxleWeight[indx] * ConvertToKips;
                        numTridemAxles[indx] = (int)Math.Ceiling(totalTrucksConst * request.TridemAxlesPer1000[indx]);

                        response.RigidEsalTridem +=
                            Utils.Calculators.calculateRigidESAL(3,
                                                request.TerminalServiceability,
                                                thicknessDesign,
                                                tridemaxleweight,
                                                numTridemAxles[indx]);
                    }
                }
                response.TotalTruckDamage = response.RigidEsalSingle + response.RigidEsalTandem + response.RigidEsalTridem;
                response.AllowableTruckDamage = TruckCalculatorService.CalculateAllowableTruckDamage(request, thicknessDesign);
            }

            double roundXH = thicknessDesign;

            roundXH = (Math.Ceiling(roundXH * 4) / 4) / ConvertToInches;
            thicknessDesign = thicknessDesign / ConvertToInches;

            response.MinimumRequiredThickness = thicknessDesign.ToString("#0.00");
            response.DesignThickness = roundXH.ToString("#0.00");
            return response;
        }

        public static CrcpSteelResponse CalculateCrcpSteel(CrcpSteelRequest request)
        {
            if(request == null)
            {
                throw new ArgumentException("malformed request");
            }
            
              double ConvertToInches = 1.0,
                     ConvertTokgs   = 1.0;              

            if (request.ConvertToMetric)
            {
                ConvertToInches = 0.0393700787;
                ConvertTokgs   = 2.2046244202;
            }

            double dbthickness;

            dbthickness = request.Thickness * ConvertToInches;
            
            const double width = 12.0;
            CrcpSteelResponse response = new CrcpSteelResponse();

            double tmpVal = Math.Pow(((request.BarSize / 8.0) / 2.0), 2.0);

            response.pSteelSpacing = ((12.0 * width - 6.0) * Math.PI * tmpVal)
                / (12.0 * dbthickness * width * (request.PercentageSteelRequired/100.0));

            response.pSteelSpacing = ((Math.Ceiling( response.pSteelSpacing * 2) / 2))/ConvertToInches;
            
            response.NumberOfBarsPerLane = ((int)Math.Ceiling((12 * width - 6) / (response.pSteelSpacing*ConvertToInches)));

            response.pSteelWeightLanePerMile = (request.UnitWeightOfSteel * response.NumberOfBarsPerLane * 5280); // * request.BarSize; // removed for CRCP Steel Calcs v2

            // modification added in v2
            if(request.SteelLength == null)
            {
                request.SteelLength = 60;
            }
            if(request.LapSpliceDistance == null)
            {
                request.LapSpliceDistance = 24;
            }
            double scalar = request.SteelLength.Value / (request.SteelLength.Value - (request.LapSpliceDistance.Value/12.0));
            response.pSteelWeightLanePerMile = (response.pSteelWeightLanePerMile / ConvertTokgs) * scalar;
            return response;
        }
    }
}
