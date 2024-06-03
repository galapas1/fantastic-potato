using GoPaveServer.Models;
using GoPaveServer.Utils;
using System;
using Newtonsoft.Json;

namespace GoPaveServer.Services
{
    public class TruckCalculatorService
    {
        public static TrafficTruckResponse CalculateTruckTraffic(TrafficTruckRequest request)
        {
            double TrucksPerDayFinal = request.TrucksPerDay * (request.DirectionalDistribution / 100.0);
            TrucksPerDayFinal = TrucksPerDayFinal * (request.DesignLaneDistribution  / 100.0);

            if(request.TrafficGrowthRate > 0)
            {
                TrucksPerDayFinal =
                    (TrucksPerDayFinal / request.DesignLife) *
                        (Math.Pow((1.0 + request.TrafficGrowthRate / 100.0), request.DesignLife) - 1.0) / (request.TrafficGrowthRate / 100.0);
            }

            var response = new TrafficTruckResponse()
            {
                AverageTrucks = TrucksPerDayFinal,
                TotalTrucks = TrucksPerDayFinal * request.DesignLife * 365.25
            };
            return response;
        }

        public static double CalculateAllowableTruckDamage(CrcpThicknessRequest request, double thicknessDesign)
        {
            double rel1 = 0.0, z1 = 0.0,
                   rel2 = 0.0, z2 = 0.0;

             double ConvertToPSI    = 1.0,
                    ConvertToPSIIN  = 1.0;

            double dbCompositeKValueOfSubstructure;
            double dbModulusOfElasticity;
            double dbFlexuralStrength;         

            if (request.ConvertToMetric)
            {
                ConvertToPSI    = 145.0377;
                ConvertToPSIIN  = 3.683958;
            }

            dbCompositeKValueOfSubstructure = request.CompositeKValueOfSubstructure * ConvertToPSIIN;
            dbModulusOfElasticity =  request.ModulusOfElasticity * ConvertToPSI;
            dbFlexuralStrength = request.FlexuralStrength * ConvertToPSI;

            Utils.Calculators.getNormalDeviateDeterminationBasedOnReliability(request.Reliability,
                                                                              out rel1, out rel2,
                                                                              out z1,   out z2);

            double r = (request.Reliability - rel1) / (rel2 - rel1);
            double zr = z1 + (r * (z2 - z1));

            double rige1 = zr * 0.35 + 7.35 *
                           Math.Log10(thicknessDesign + 1) - 0.06 +
                           (
                                Math.Log10((request.InitialServiceability - request.TerminalServiceability) / 3.0)
                            ) / (
                                1 + 16240000.0 / Math.Pow(thicknessDesign + 1.0, 8.46)
                            );

            double v1 = (dbFlexuralStrength * request.DrainageCoefficient * (Math.Pow(thicknessDesign, 0.75) - 1.132));
            double v3 = Math.Pow(thicknessDesign, 0.75) - 18.42 / Math.Pow(dbModulusOfElasticity / dbCompositeKValueOfSubstructure, 0.25);

            double rige2 = (4.22 - 0.32 * request.TerminalServiceability) * Math.Log10(v1 / (215.63 * request.LoadTransferCoefficient * v3));

            return Math.Pow(10.0, (rige1 + rige2));
        }
    }
}
