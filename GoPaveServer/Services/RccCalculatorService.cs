using GoPaveServer.Models;
using GoPaveServer.Calculators;
using GoPaveServer.Services;
using System;
using Newtonsoft.Json;

namespace GoPaveServer.Services
{
    public class RccCalculatorService
    {
        public static RccThicknessResponse CalculateRccThickness(ThicknessRequest request)
        {
            request.PavementType = 2;
            request.DoweledPavement = false;
            RccThicknessResponse response = new RccThicknessResponse();
            response.UndoweledThickness = ThicknessCalculator.CalculateThickness(request);
            return response;
        }

        public static RccKValueSensitivityResponse PlotRccKValueSensitivity(RccKValueSensitivityRequest request)
        {
            int KValueStartRange = 50;
            int KValueEndRange   = 600;

              if(request.ConvertToMetric)
                {
                KValueStartRange = 15;
                KValueEndRange   = 180;
                }

            int increment = 50;

             if(request.ConvertToMetric)
                {
                increment = 15;
                }

            int arrayLength = ((KValueEndRange - KValueStartRange) / increment) + 1;
            KValueSensitivity[] DoweledDataPoints = new KValueSensitivity[arrayLength];
            KValueSensitivity[] UndoweledDataPoints = new KValueSensitivity[arrayLength];

            for(int indx = 0, step = KValueStartRange; step <= KValueEndRange; indx +=1, step += increment)
            {
                request.CompositeKValueOfSubstructure = step;
                RccThicknessResponse resp = CalculateRccThickness(request);
                UndoweledDataPoints[indx] = new KValueSensitivity();
                UndoweledDataPoints[indx].KValue    = step;
                UndoweledDataPoints[indx].Thickness = Convert.ToDouble(resp.UndoweledThickness.DesignThickness);
            }
            return new RccKValueSensitivityResponse() {
                UndoweledDataPoints = UndoweledDataPoints,
                Increment  = increment
            };
        }

        public static RccFlexuralStrengthSensitivityResponse PlotRccStrengthSensitivity(RccFlexuralStrengthSensitivityRequest request)
        {
           double FlexuralStrengthStartRange = 400;
            double FlexuralStrengthEndRange   = 800;

             if(request.ConvertToMetric)
                {
                FlexuralStrengthStartRange = 3.2;
                FlexuralStrengthEndRange   = 5.6;
                }

            double increment = 50;

             if(request.ConvertToMetric)
                {
                increment = .2;
                }
                         
            if(!(request.Increment == null || request.Increment == 0))
            {
                increment = request.Increment.Value;
            }
            
            int arrayLength =  Convert.ToInt32(((FlexuralStrengthEndRange - FlexuralStrengthStartRange) / increment) + 1);
            FlexuralStrengthSensitivity[] DoweledDataPoints = new FlexuralStrengthSensitivity[arrayLength];
            FlexuralStrengthSensitivity[] UndoweledDataPoints = new FlexuralStrengthSensitivity[arrayLength];

            for(double indx = 0, step = FlexuralStrengthStartRange; step <= FlexuralStrengthEndRange; indx +=1, step += increment)
            {
                request.FlexuralStrength = step;
                RccThicknessResponse resp = CalculateRccThickness(request);
                UndoweledDataPoints[(int)indx] = new FlexuralStrengthSensitivity();
                UndoweledDataPoints[(int)indx].FlexuralStrength = Math.Round(step,1);
                UndoweledDataPoints[(int)indx].Thickness        = Convert.ToDouble(resp.UndoweledThickness.DesignThickness);
            }
            return new RccFlexuralStrengthSensitivityResponse() {
                UndoweledDataPoints = UndoweledDataPoints,
                Increment  = increment
            };
        }

        public static RccSlabsCrackedSensitivityResponse PlotRccSlabsCrackedSensitivity(RccSlabsCrackedSensitivityRequest request)
        {
            const double SlabsCrackedStartRange = 0.01;
            const double SlabsCrackedEndRange   = 50.0;

            int increment = 5;
            if(!(request.Increment == null || request.Increment == 0))
            {
                increment = request.Increment.Value;
            }

            int arrayLength = (int)((SlabsCrackedEndRange - SlabsCrackedStartRange) / increment) + 1;
            SlabsCrackedSensitivity[] dataPoints = new SlabsCrackedSensitivity[arrayLength];

            request.DoweledPavement = false;
            for(double indx = 0, step = SlabsCrackedStartRange; step <= SlabsCrackedEndRange; indx +=1, step += increment)
            {
                request.PercentSlabsCracked = step;
                RccThicknessResponse response = new RccThicknessResponse();
                response.UndoweledThickness = ThicknessCalculator.CalculateThickness(request);

                dataPoints[(int)indx] = new SlabsCrackedSensitivity();
                dataPoints[(int)indx].SlabsCracked = (int)step;
                dataPoints[(int)indx].Thickness = Convert.ToDouble(response.UndoweledThickness.ThicknessDesign);
            }
            return new RccSlabsCrackedSensitivityResponse() {
                UndoweledDataPoints = dataPoints,
                Increment  = increment
            };
        }

        public static RccReliabilitySensitivityResponse PlotRccReliabilitySensitivity(RccReliabilitySensitivityRequest request)
        {
            const int ReliabilityStartRange = 50;
            const int ReliabilityEndRange   = 100;

            int increment = 5;
            if(!(request.Increment == null || request.Increment == 0))
            {
                increment = request.Increment.Value;
            }

            int arrayLength = ((ReliabilityEndRange - ReliabilityStartRange) / increment) + 1;
            ReliabilitySensitivity[] DoweledDataPoints = new ReliabilitySensitivity[arrayLength];
            ReliabilitySensitivity[] UndoweledDataPoints = new ReliabilitySensitivity[arrayLength];

            for(int indx = 0, step = ReliabilityStartRange; step <= ReliabilityEndRange; indx +=1, step += increment)
            {
                request.Reliability = (step == 100 ? 99.99 : step);
                RccThicknessResponse resp = CalculateRccThickness(request);
                UndoweledDataPoints[indx] = new ReliabilitySensitivity();
                UndoweledDataPoints[indx].Reliability = (step == 100 ? 99.99 : step);
                UndoweledDataPoints[indx].Thickness   = Convert.ToDouble(resp.UndoweledThickness.DesignThickness);
            }
            return new RccReliabilitySensitivityResponse() {
                UndoweledDataPoints = UndoweledDataPoints,
                Increment  = increment
            };
        }

        public static RccDesignLifeSensitivityResponse PlotRccpDesignLifeSensitivity(RccDesignLifeSensitivityRequest request)
        {
            const int DesignLifeStartRange = 5;
            const int DesignLifeEndRange   = 75;

            int increment = 5;
            if(!(request.Increment == null || request.Increment == 0))
            {
                increment = request.Increment.Value;
            }

            int arrayLength = ((DesignLifeEndRange - DesignLifeStartRange) / increment) + 1;
            DesignLifeSensitivity[] UndoweledDataPoints = new DesignLifeSensitivity[arrayLength];

            for(int indx = 0, step = DesignLifeStartRange; step <= DesignLifeEndRange; indx +=1, step += increment)
            {
                TrafficTruckRequest truckTrafficRequest = new TrafficTruckRequest() {
                    TrucksPerDay            = request.TrucksPerDay,
                    TrafficGrowthRate       = request.TrafficGrowthRate,
                    DesignLife              = step,
                    DirectionalDistribution = request.DirectionalDistribution,
                    DesignLaneDistribution  = request.DesignLaneDistribution
                };
                TrafficTruckResponse truckTrafficResponse = TruckCalculatorService.CalculateTruckTraffic(truckTrafficRequest);
                request.TotalTrucksInDesignLaneOverDesignLife = truckTrafficResponse.TotalTrucks;

                RccThicknessResponse RccThicknessResponse = CalculateRccThickness(request);

                UndoweledDataPoints[indx] = new DesignLifeSensitivity();
                UndoweledDataPoints[indx].DesignLife = step;
                UndoweledDataPoints[indx].Thickness  = Convert.ToDouble(RccThicknessResponse.UndoweledThickness.DesignThickness);
            }
            return new RccDesignLifeSensitivityResponse() {
                UndoweledDataPoints = UndoweledDataPoints,
                Increment  = increment
            };
        }
    }
}
