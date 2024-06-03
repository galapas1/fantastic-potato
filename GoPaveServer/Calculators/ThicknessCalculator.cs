using GoPaveServer.Models;
using GoPaveServer.Utils;
using System;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Http;

namespace GoPaveServer.Calculators
{
    public class ThicknessCalculator
    {
        public static ThicknessResponse CalculateThickness(ThicknessRequest request, HttpContext httpContext = null)
        {
          
            const double XMRF  = 1.235;
            const double RATIO = 0.894;
            const int    V     = 15;
            const int    TRKED = 6;       
            
            double dbCompositeKValueOfSubstructure;
            double dbModulusOfElasticity;
            double dbFlexuralStrength;
            
            if(request == null)
            {
                throw new ArgumentException("malformed request");
            }

            request.Validate();

            ThicknessResponse response = new ThicknessResponse();
            response.ThicknessDesign = 3.5;

            double ConvertToPSI   = 1.0,
                   ConvertToPSIIN = 1.0,
                   ConvertMM      = 1.0,
                   ConvertKN      = 1.0,
                   ConvertFT      = 1.0;

                if(request.ConvertToMetric)
                {
                  ConvertToPSI    = 145.0377;
                  ConvertToPSIIN  = 3.683958;       
                  ConvertMM       = 25.4;
                  ConvertKN       = 4.448;
                  ConvertFT       = 0.3048;   
                }       
            
            dbCompositeKValueOfSubstructure = request.CompositeKValueOfSubstructure * ConvertToPSIIN;
            dbModulusOfElasticity =  request.ModulusOfElasticity * ConvertToPSI;
            dbFlexuralStrength = request.FlexuralStrength * ConvertToPSI;

            //Possible error on second pass
            if(request.IsMacroFibers)
            {
               dbFlexuralStrength =  dbFlexuralStrength * (1 + (request.ResidualStrength / 100.0));
            }

            double[] SingleRepetitions = new double[10];
            double[] TandemRepetitions = new double[10];
            double[] TridemRepetitions = new double[10];

            double[] FC   = new double[10];
            double[] FCT  = new double[10];
            double[] FCTR = new double[10];

            double[] SinglePower = new double[10];
            double[] TandemPower = new double[10];
            double[] TridemPower = new double[10];

            double[] SingleDamage = new double[10];
            double[] TandemDamage = new double[10];
            double[] TridemDamage = new double[10];

            double[] SingleAllowableRepetions = new double[10];
            double[] TandemAllowableRepetions = new double[10];
            double[] TridemAllowableRepetions = new double[10];

            double totalFatigue = 0.0,
                   totalErosion = 0.0;
            double prettlFatigue = 101.0;
            double prettlErosion = 101.0;

            double reliability = 0.0;
            while( prettlFatigue >= 100 || prettlErosion >= 100)
            {
                response.ThicknessDesign += 0.01;

                for(int indx = 0; indx < request.NumSingleAxles(); ++indx)
                {
                    SingleRepetitions[indx] =
                        request.getSingleAxlesPer1000(indx) *
                        request.TotalTrucksInDesignLaneOverDesignLife / 1000.0;
                }

                for(int indx = 0; indx < request.NumTandemAxles(); ++indx)
                {
                    TandemRepetitions[indx] =
                        request.getTandemAxlesPer1000(indx) *
                        request.TotalTrucksInDesignLaneOverDesignLife / 1000.0;
                }

                for(int indx = 0; indx < request.NumTridemAxles(); ++indx)
                {
                    TridemRepetitions[indx] =
                        request.getTridemAxlesPer1000(indx) *
                        request.TotalTrucksInDesignLaneOverDesignLife / 1000.0;
                }

                double L = Utils.Calculators.calculateL
                (
                    response.ThicknessDesign, dbModulusOfElasticity, dbCompositeKValueOfSubstructure
                );
                
                response.Testkvalue = dbCompositeKValueOfSubstructure.ToString();
                response.TestModulusOfElasticity           = dbModulusOfElasticity.ToString();
                response.TestFlexuralStrength              = dbFlexuralStrength.ToString();

                double xmreq = XMRF * dbFlexuralStrength * (100 - V) / 100.0;

                double EQ2N = 0, EQ6N = 0, EQ3N = 0, XMOMS = 0, XMOMT = 0, XMOMTR = 0;

                double[] DEJLL = new double[3];
                double[] DECLL = new double[3];

                EQ2N = Utils.Calculators.calculateEQ2N(L);
                EQ6N = Utils.Calculators.calculateEQ6N(L);
                EQ3N = Utils.Calculators.calculateEQ3N(L);
                {
                    double tmpVal = 0.8742 + 0.01088 * Math.Pow(dbCompositeKValueOfSubstructure, 0.447);
                    EQ2N *= tmpVal; EQ6N *= tmpVal;
                }
                EQ3N = EQ3N * (11.3345 + 0.2218 * Math.Pow(dbCompositeKValueOfSubstructure, 0.448));
                XMOMS  = EQ2N; XMOMT  = EQ6N; XMOMTR = EQ3N;

                if(request.EdgeSupport && request.DoweledPavement)
                {
                    double EQ18P = Utils.Calculators.calculateEQ18P(L);
                    double EQ28P = Utils.Calculators.calculateEQ28P(L);
                    double EQ38P = Utils.Calculators.calculateEQ38P(L);

                    DEJLL[0] = EQ18P / dbCompositeKValueOfSubstructure;
                    DEJLL[1] = EQ28P / dbCompositeKValueOfSubstructure;
                    DEJLL[2] = EQ38P / dbCompositeKValueOfSubstructure;
                }
                else if(request.EdgeSupport && !request.DoweledPavement)
                {
                    double EQ17P = Utils.Calculators.calculateEQ17P(L);
                    double EQ27P = Utils.Calculators.calculateEQ27P(L);
                    double EQ37P = Utils.Calculators.calculateEQ37P(L);

                    double tmpVal = 1.001 - Math.Pow(0.26363 - dbCompositeKValueOfSubstructure / 3034.5, 2.0);
                    EQ17P *= tmpVal; EQ27P *= tmpVal; EQ37P *= tmpVal;

                    DEJLL[0] = EQ17P / dbCompositeKValueOfSubstructure;
                    DEJLL[1] = EQ27P / dbCompositeKValueOfSubstructure;
                    DEJLL[2] = EQ37P / dbCompositeKValueOfSubstructure;
                }
                else if(!request.EdgeSupport && request.DoweledPavement)
                {
                    double EQ1N = Utils.Calculators.calculateEQ1N(L);
                    double EQ5N = Utils.Calculators.calculateEQ5N(L);
                    double EQ7N = Utils.Calculators.calculateEQ7N(L);

                    XMOMS = EQ1N; XMOMT = EQ5N; XMOMTR = EQ7N;
                    double EQ32P = Utils.Calculators.calculateEQ32P(L);
                    double EQ43P = Utils.Calculators.calculateEQ43P(L);
                    double EQ54P = Utils.Calculators.calculateEQ54P(L);

                    DECLL[1] = EQ32P / dbCompositeKValueOfSubstructure;
                    DECLL[1] = EQ43P / dbCompositeKValueOfSubstructure;
                    DECLL[2] = EQ54P / dbCompositeKValueOfSubstructure;
                } // !EdgetSupport && !DoweledPavement
                else
                {
                    double EQ1N = Utils.Calculators.calculateEQ1N(L);
                    double EQ5N = Utils.Calculators.calculateEQ5N(L);
                    double EQ7N = Utils.Calculators.calculateEQ7N(L);

                    XMOMS = EQ1N; XMOMT = EQ5N; XMOMTR = EQ7N;

                    double EQ31P = Utils.Calculators.calculateEQ31P(L);
                    double EQ42P = Utils.Calculators.calculateEQ42P(L);
                    double EQ53P = Utils.Calculators.calculateEQ53P(L);

                    DECLL[0] = EQ31P / dbCompositeKValueOfSubstructure;
                    DECLL[1] = EQ42P / dbCompositeKValueOfSubstructure;
                    DECLL[2] = EQ53P / dbCompositeKValueOfSubstructure;
                }

                double[] DFLCT   = new double[10];
                double[] DFLCTT  = new double[10];
                double[] DFLCTTR = new double[10];

                for(int indx = 0; indx < 10; ++indx)
                {
                    double singleStressRatio = Math.Pow((request.getSingleAxleWeight(indx) / ConvertKN) / 24.0, 0.94) * 24.0 / 18.0 * 6.0 * XMOMS  / response.ThicknessDesign / response.ThicknessDesign * RATIO;
                    double tandemStressRatio = Math.Pow((request.getTandemAxleWeight(indx) / ConvertKN) / 48.0, 0.94) * 48.0 / 36.0 * 6.0 * XMOMT  / response.ThicknessDesign / response.ThicknessDesign * RATIO;
                    double tridemStressRatio = Math.Pow((request.getTridemAxleWeight(indx) / ConvertKN) / 72.0, 0.94) * 72.0 / 54.0 * 6.0 * XMOMTR / response.ThicknessDesign / response.ThicknessDesign * RATIO;

                    double TRUCK = 0, TRUCKT = 0, TRUCKTR = 0;
                    if(request.EdgeSupport)
                    {
                        DFLCT[indx] = DEJLL[0] * (request.getSingleAxleWeight(indx) / ConvertKN) / 18.0;
                        TRUCK = 1 - TRKED / 100.0;

                        DFLCTT[indx] = DEJLL[1] * (request.getTandemAxleWeight(indx) / ConvertKN) / 36.0;
                        TRUCKT = 1 - TRKED / 100.0;

                        DFLCTTR[indx] = DEJLL[2] * (request.getTridemAxleWeight(indx) / ConvertKN) / 54.0;
                        TRUCKTR = 1 - TRKED / 100.0;
                    }
                    else
                    {
                        singleStressRatio *= (0.892 + response.ThicknessDesign / 85.71 - response.ThicknessDesign * response.ThicknessDesign / 3000.0);
                        DFLCT[indx] = DECLL[0] * (request.getSingleAxleWeight(indx) / ConvertKN) / 18.0;
                        DFLCT[indx] = 0.896 * DFLCT[indx];
                        TRUCK = TRKED / 100.0;

                        tandemStressRatio *=  (0.892 + response.ThicknessDesign / 85.71 - response.ThicknessDesign * response.ThicknessDesign / 3000.0);
                        DFLCTT[indx] = DECLL[1] * (request.getTandemAxleWeight(indx) / ConvertKN) / 36.0;
                        DFLCTT[indx] = DFLCTT[indx] * 0.896;
                        TRUCKT = TRKED / 100.0;

                        tridemStressRatio *= (0.892 + response.ThicknessDesign / 85.71 - response.ThicknessDesign * response.ThicknessDesign / 3000.0);
                        DFLCTTR[indx] = DECLL[2] * (request.getTridemAxleWeight(indx) / ConvertKN) / 54.0;
                        DFLCTTR[indx] = DFLCTTR[indx] * 0.896;
                        TRUCKTR = TRKED / 100.0;
                    }

                    double X   = 1000 / 3.7219 * Math.Pow(dbCompositeKValueOfSubstructure, 1.27) * Math.Pow(DFLCT  [indx], 2.0) / response.ThicknessDesign;
                    double XT  = 1000 / 3.7219 * Math.Pow(dbCompositeKValueOfSubstructure, 1.27) * Math.Pow(DFLCTT [indx], 2.0) / response.ThicknessDesign;
                    double XTR = 1000 / 3.7219 * Math.Pow(dbCompositeKValueOfSubstructure, 1.27) * Math.Pow(DFLCTTR[indx], 2.0) / response.ThicknessDesign;

                    SinglePower[indx] = X;
                    TandemPower[indx] = XT;
                    TridemPower[indx] = XTR;

                    double ADJUST = 1.0 - Math.Pow(dbCompositeKValueOfSubstructure / 2000.0 * 4.0 / response.ThicknessDesign, 2.0);
                      X *= ADJUST;   X = Utils.Calculators.limitVal(X);
                     XT *= ADJUST;  XT = Utils.Calculators.limitVal(XT);
                    XTR *= ADJUST; XTR = Utils.Calculators.limitVal(XTR);

                    response.SingleRepetitions[indx] = Math.Pow(10.0, X  ) / TRUCK;
                    response.TandemRepetitions[indx] = Math.Pow(10.0, XT ) / TRUCKT;
                    response.TridemRepetitions[indx] = Math.Pow(10.0, XTR) / TRUCKTR;

                    SingleDamage[indx] = SingleRepetitions[indx] / response.SingleRepetitions[indx] * 100.0;
                    TandemDamage[indx] = TandemRepetitions[indx] / response.TandemRepetitions[indx] * 100.0;
                    TridemDamage[indx] = TridemRepetitions[indx] / response.TridemRepetitions[indx] * 100.0;

                    response.SingleStressRatio[indx] = Math.Round(singleStressRatio / xmreq, 3).ToString();
                    response.TandemStressRatio[indx] = Math.Round(tandemStressRatio / xmreq, 3).ToString();
                    response.TridemStressRatio[indx] = Math.Round(tridemStressRatio / xmreq, 3).ToString();

                    reliability = 100.0 - request.Reliability;
                    reliability = 100.0 - reliability * request.PercentSlabsCracked / 50.0;

                    double singleStressTmp = singleStressRatio / xmreq;
                    //Program.Trace("indx: " + indx);
                    //Program.Trace("singleStressTmp: " + singleStressTmp);
                    //Program.Trace("reliability: " + reliability);
                    //Program.Trace("");
                    SingleAllowableRepetions[indx] =
                        Math.Pow(10.0, (Math.Pow((Math.Pow(singleStressTmp, -10.24) * -1.0 * Math.Log(reliability / 100.0) / 0.0112), 0.217)));

                    double tandemStressTmp = tandemStressRatio / xmreq;
                    TandemAllowableRepetions[indx] =
                        Math.Pow(10.0, (Math.Pow((Math.Pow(tandemStressTmp, -10.24) * -1.0 * Math.Log(reliability / 100.0) / 0.0112), 0.217)));

                    double tridemStressTmp = tridemStressRatio / xmreq;
                    TridemAllowableRepetions[indx] =
                        Math.Pow(10.0, (Math.Pow((Math.Pow(tridemStressTmp, -10.24) * -1.0 * Math.Log(reliability / 100.0) / 0.0112), 0.217)));

                    FC[indx] = SingleRepetitions[indx] / SingleAllowableRepetions[indx] * 100.0;
                    FCT[indx] = TandemRepetitions[indx] / TandemAllowableRepetions[indx] * 100.0;
                    FCTR[indx] = TridemRepetitions[indx] / TridemAllowableRepetions[indx] * 100.0;
                }

                totalFatigue = 0.0; totalErosion = 0.0;
                for(int indx = 0; indx < 10; ++indx)
                {
                    totalFatigue += FC[indx] + FCT[indx] + FCTR[indx];
                    totalErosion += SingleDamage[indx]
                                 +  TandemDamage[indx]
                                 +  TridemDamage[indx];
                }
                prettlFatigue = totalFatigue;
                prettlErosion = totalErosion;
                //Program.Trace("PrettlFatigue: " +  prettlFatigue);
                //Program.Trace("PrettlErosion: " + prettlErosion);

                if (null != httpContext)
                {
                    if (httpContext.RequestAborted.IsCancellationRequested)
                    {
                        throw new SystemException("http request aborted");
                    }
                }
            }

            for(int indx = 0; indx < request.NumSingleAxles(); ++indx)
            {
                response.SingleAxleWeight  [indx] = Math.Round(request.getSingleAxleWeight(indx) , 1).ToString();
                response.SingleAxlesPer1000[indx] = Math.Round(request.getSingleAxlesPer1000(indx), 2).ToString();
                response.SingleAxleExpectedRepetitions[indx] = SingleRepetitions[indx].ToString("N0");
                if(SingleAllowableRepetions[indx] > 999999999)
                {
                    response.SingleAllowableRepetionsLow[indx] = "unlimited";
                }
                else
                {
                    response.SingleAllowableRepetionsLow[indx] = SingleAllowableRepetions[indx].ToString("N0");
                }
                response.SingleFatigueConsumed[indx] = Math.Round(FC[indx], 2).ToString();
                response.SinglePower[indx] = Math.Round(SinglePower[indx], 3).ToString();
                if(response.SingleRepetitions[indx] > 999999999)
                {
                    response.SingleAllowableRepetions[indx] = "unlimited";
                }
                else
                {
                    response.SingleAllowableRepetions[indx] = Utils.Calculators.toInt(response.SingleRepetitions[indx]).ToString("N0");
                }
                response.SingleDamage[indx] = Math.Round(SingleDamage[indx], 2).ToString();
            }

            for(int indx = 0; indx < request.NumTandemAxles(); ++indx)
            {
                response.TandemAxleWeight  [indx] = Math.Round(request.getTandemAxleWeight(indx) , 1).ToString();
                response.TandemAxlesPer1000[indx] = Math.Round(request.getTandemAxlesPer1000(indx), 2).ToString();
                response.TandemAxleExpectedRepetitions[indx] = TandemRepetitions[indx].ToString("N0");
                if(TandemAllowableRepetions[indx] > 999999999)
                {
                    response.TandemAllowableRepetionsLow[indx] = "unlimited";
                }
                else
                {
                    response.TandemAllowableRepetionsLow[indx] = TandemAllowableRepetions[indx].ToString("N0");
                }
                response.TandemFatigueConsumed[indx] = Math.Round(FCT[indx], 2).ToString();
                response.TandemPower[indx] = Math.Round(TandemPower[indx], 3).ToString();
                if(response.TandemRepetitions[indx] > 999999999)
                {
                    response.TandemAllowableRepetions[indx] = "unlimited";
                }
                else
                {
                    response.TandemAllowableRepetions[indx] = Utils.Calculators.toInt(response.TandemRepetitions[indx]).ToString("N0");
                }
                response.TandemDamage[indx] = Math.Round(TandemDamage[indx], 2).ToString();
            }

            for(int indx = 0; indx < request.NumTridemAxles(); ++indx)
            {
                response.TridemAxleWeight  [indx] = Math.Round(request.getTridemAxleWeight(indx) , 1).ToString();
                response.TridemAxlesPer1000[indx] = Math.Round(request.getTridemAxlesPer1000(indx), 2).ToString();
                response.TridemAxleExpectedRepetitions[indx] = TridemRepetitions[indx].ToString("N0");
                if(TridemAllowableRepetions[indx] > 999999999)
                {
                    response.TridemAllowableRepetionsLow[indx] = "unlimited";
                }
                else
                {
                    response.TridemAllowableRepetionsLow[indx] = TridemAllowableRepetions[indx].ToString("N0");
                }
                response.TridemFatigueConsumed[indx] = Math.Round(FCTR[indx], 2).ToString();
                response.TridemPower[indx] = Math.Round(TridemPower[indx], 3).ToString();
                if(response.TridemRepetitions[indx] > 999999999)
                {
                    response.TridemAllowableRepetions[indx] = "unlimited";
                }
                else
                {
                    response.TridemAllowableRepetions[indx] = Utils.Calculators.toInt(response.TridemRepetitions[indx]).ToString("N0");
                }
                response.TridemDamage[indx] = Math.Round(TridemDamage[indx], 2).ToString();
            }

            response.TotalErosionUsed = Math.Round(totalErosion, 2).ToString();
            response.TotalFatigue     = Math.Round(totalFatigue, 2).ToString();
            response.MinimumRequiredThickness = Math.Round(response.ThicknessDesign * ConvertMM, 2);

            double originalthickness = response.ThicknessDesign;
            if(request.ConvertToMetric)
            {
                response.ThicknessDesign *= ConvertMM;
                response.ThicknessDesign /= 5.0;
                response.ThicknessDesign = Math.Round(response.ThicknessDesign) * 5.0;
                if((response.ThicknessDesign * ConvertMM) > (originalthickness * ConvertMM) )
                { /* do nothing */ }
                else
                {
                    response.ThicknessDesign += 5.0;
                }

            }
            else
            {
                response.ThicknessDesign = (Math.Ceiling(response.ThicknessDesign * 4) / 4) * ConvertMM;
            }
           response.DesignThickness = response.ThicknessDesign.ToString("#0.00");

            double xhconvertJntSpc = 0.0;

            //New calculation based on radius of relative stiffness
            xhconvertJntSpc=(5.25*Math.Pow((dbModulusOfElasticity*Math.Pow((response.ThicknessDesign/ConvertMM),3.0)/(12*(1-Math.Pow(0.15,2.0))*dbCompositeKValueOfSubstructure)),0.25))/12;

            //Old calculation from in StreetPave 12
            //if(dbCompositeKValueOfSubstructure <= 250)
            //{
            //    xhconvertJntSpc = Math.Round(response.ThicknessDesign * 2, 2);
            //}
            //else if(dbCompositeKValueOfSubstructure >= 350)
            //{
            //    xhconvertJntSpc = Math.Round(response.ThicknessDesign * 1.75, 2);
            //}
            //else
            //{
            //    xhconvertJntSpc = Math.Round(2 * response.ThicknessDesign - 0.03 / 12.0 * response.ThicknessDesign * (dbCompositeKValueOfSubstructure - 250), 2);
            //}

            if(xhconvertJntSpc > 15)
           {
                xhconvertJntSpc = 15;
            }
            if(xhconvertJntSpc < 6)
           {
                xhconvertJntSpc = 6;
            }
            
            if(request.ConvertToMetric)
            {
             response.MaximumJointSpacing = Math.Round((xhconvertJntSpc * ConvertFT),2).ToString();
            }
            else
            {
            response.MaximumJointSpacing = Math.Ceiling(xhconvertJntSpc * ConvertFT).ToString();           
            }

            return response;
        }
    }
}
