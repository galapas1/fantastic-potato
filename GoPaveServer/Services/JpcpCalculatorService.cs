using GoPaveServer.Calculators;
using GoPaveServer.Models;
using System;
using Newtonsoft.Json;

namespace GoPaveServer.Services
{
    public class JpcpCalculatorService
    {
        public static JpcpThicknessResponse CalculateJpcpThickness(ThicknessRequest request)
        {
            JpcpThicknessResponse response = new JpcpThicknessResponse();

            request.PavementType = 1;

            request.DoweledPavement = true;
            response.DoweledThickness = ThicknessCalculator.CalculateThickness(request);

            request.DoweledPavement = false;
            response.UndoweledThickness = ThicknessCalculator.CalculateThickness(request);

            return response;
        }

        public static JpcpKValueSensitivityResponse PlotJpcpKValueSensitivity(JpcpKValueSensitivityRequest request)
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

            if(!(request.Increment == null || request.Increment == 0))
            {
                increment = request.Increment.Value;
            }

            int arrayLength = ((KValueEndRange - KValueStartRange) / increment) + 1;
            KValueSensitivity[] DoweledDataPoints = new KValueSensitivity[arrayLength];
            KValueSensitivity[] UndoweledDataPoints = new KValueSensitivity[arrayLength];

            for(int indx = 0, step = KValueStartRange; step <= KValueEndRange; indx +=1, step += increment)
            {
                request.CompositeKValueOfSubstructure = step;
                JpcpThicknessResponse resp = CalculateJpcpThickness(request);
                DoweledDataPoints[indx] = new KValueSensitivity();
                DoweledDataPoints[indx].KValue    = step;
                DoweledDataPoints[indx].Thickness = Convert.ToDouble(resp.DoweledThickness.DesignThickness);

                UndoweledDataPoints[indx] = new KValueSensitivity();
                UndoweledDataPoints[indx].KValue    = step;
                UndoweledDataPoints[indx].Thickness = Convert.ToDouble(resp.UndoweledThickness.DesignThickness);
            }
            return new JpcpKValueSensitivityResponse() {
                DoweledDataPoints = DoweledDataPoints,
                UndoweledDataPoints = UndoweledDataPoints,
                Increment  = increment
            };
        }

        public static JpcpFlexuralStrengthSensitivityResponse PlotJpcpStrengthSensitivity(JpcpFlexuralStrengthSensitivityRequest request)
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
                JpcpThicknessResponse resp = CalculateJpcpThickness(request);

                DoweledDataPoints[(int)indx] = new FlexuralStrengthSensitivity();
                DoweledDataPoints[(int)indx].FlexuralStrength = Math.Round(step,1);
                DoweledDataPoints[(int)indx].Thickness        = Convert.ToDouble(resp.DoweledThickness.DesignThickness);

                UndoweledDataPoints[(int)indx] = new FlexuralStrengthSensitivity();
                UndoweledDataPoints[(int)indx].FlexuralStrength = Math.Round(step,1);
                UndoweledDataPoints[(int)indx].Thickness        = Convert.ToDouble(resp.UndoweledThickness.DesignThickness);
            }
            return new JpcpFlexuralStrengthSensitivityResponse() {
                DoweledDataPoints = DoweledDataPoints,
                UndoweledDataPoints = UndoweledDataPoints,
                Increment  = increment
            };
        }

        public static JpcpSlabsCrackedSensitivityResponse PlotJpcpSlabsCrackedSensitivity(JpcpSlabsCrackedSensitivityRequest request)
        {
            const double SlabsCrackedStartRange = 0.01;
            const double SlabsCrackedEndRange   = 50.0;

            int increment = 5;
            if(!(request.Increment == null || request.Increment == 0))
            {
                increment = request.Increment.Value;
            }

            int arrayLength = (int)((SlabsCrackedEndRange - SlabsCrackedStartRange) / increment) + 1;
            SlabsCrackedSensitivity[] doweledDataPoints   = new SlabsCrackedSensitivity[arrayLength];
            SlabsCrackedSensitivity[] undoweledDataPoints = new SlabsCrackedSensitivity[arrayLength];

            for(double indx = 0, step = SlabsCrackedStartRange; step <= SlabsCrackedEndRange; indx +=1, step += increment)
            {
                request.PercentSlabsCracked = step;
                {
                    request.DoweledPavement = true;
                    JpcpThicknessResponse response = new JpcpThicknessResponse();
                    response.DoweledThickness = ThicknessCalculator.CalculateThickness(request);

                    doweledDataPoints[(int)indx] = new SlabsCrackedSensitivity();
                    doweledDataPoints[(int)indx].SlabsCracked = (int)step;
                    doweledDataPoints[(int)indx].Thickness = Convert.ToDouble(response.DoweledThickness.ThicknessDesign);
                }
                {
                    request.DoweledPavement = false;
                    JpcpThicknessResponse response = new JpcpThicknessResponse();
                    response.UndoweledThickness = ThicknessCalculator.CalculateThickness(request);

                    undoweledDataPoints[(int)indx] = new SlabsCrackedSensitivity();
                    undoweledDataPoints[(int)indx].SlabsCracked = (int)step;
                    undoweledDataPoints[(int)indx].Thickness = Convert.ToDouble(response.UndoweledThickness.ThicknessDesign);
                }
            }
            return new JpcpSlabsCrackedSensitivityResponse() {
                DoweledDataPoints   = doweledDataPoints,
                UndoweledDataPoints = undoweledDataPoints,
                Increment  = increment
            };
        }

        public static JpcpReliabilitySensitivityResponse PlotJpcpReliabilitySensitivity(JpcpReliabilitySensitivityRequest request)
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
                JpcpThicknessResponse resp = CalculateJpcpThickness(request);

                DoweledDataPoints[indx] = new ReliabilitySensitivity();
                DoweledDataPoints[indx].Reliability = (step == 100 ? 99.99 : step);
                DoweledDataPoints[indx].Thickness   = Convert.ToDouble(resp.DoweledThickness.DesignThickness);

                UndoweledDataPoints[indx] = new ReliabilitySensitivity();
                UndoweledDataPoints[indx].Reliability = (step == 100 ? 99.99 : step);
                UndoweledDataPoints[indx].Thickness   = Convert.ToDouble(resp.UndoweledThickness.DesignThickness);
            }

            ReliabilitySensitivity ReferencePoint = new ReliabilitySensitivity();
            {
                request.Reliability = 95;
                JpcpThicknessResponse resp = CalculateJpcpThickness(request);
                ReferencePoint.Reliability = 95;
                ReferencePoint.Thickness   = Convert.ToDouble(resp.UndoweledThickness.DesignThickness);
            }

            return new JpcpReliabilitySensitivityResponse() {
                DoweledDataPoints       = DoweledDataPoints,
                UndoweledDataPoints     = UndoweledDataPoints,
                UndoweledReferencePoint = ReferencePoint,
                Increment               = increment
            };
        }

        public static JpcpDesignLifeSensitivityResponse PlotJpcpDesignLifeSensitivity(JpcpDesignLifeSensitivityRequest request)
        {
            const int DesignLifeStartRange = 5;
            const int DesignLifeEndRange   = 75;

            int increment = 5;
            if(!(request.Increment == null || request.Increment == 0))
            {
                increment = request.Increment.Value;
            }

            int arrayLength = ((DesignLifeEndRange - DesignLifeStartRange) / increment) + 1;
            DesignLifeSensitivity[] DoweledDataPoints = new DesignLifeSensitivity[arrayLength];
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

                JpcpThicknessResponse JpcpThicknessResponse = CalculateJpcpThickness(request);

                DoweledDataPoints[indx] = new DesignLifeSensitivity();
                DoweledDataPoints[indx].DesignLife = step;
                DoweledDataPoints[indx].Thickness  = Convert.ToDouble(JpcpThicknessResponse.DoweledThickness.DesignThickness);

                UndoweledDataPoints[indx] = new DesignLifeSensitivity();
                UndoweledDataPoints[indx].DesignLife = step;
                UndoweledDataPoints[indx].Thickness  = Convert.ToDouble(JpcpThicknessResponse.UndoweledThickness.DesignThickness);
            }
            DesignLifeSensitivity ReferencePoint = new DesignLifeSensitivity();
            {
                TrafficTruckRequest truckTrafficRequest = new TrafficTruckRequest() {
                    TrucksPerDay            = request.TrucksPerDay,
                    TrafficGrowthRate       = request.TrafficGrowthRate,
                    DesignLife              = 20,
                    DirectionalDistribution = request.DirectionalDistribution,
                    DesignLaneDistribution  = request.DesignLaneDistribution
                };
                TrafficTruckResponse truckTrafficResponse = TruckCalculatorService.CalculateTruckTraffic(truckTrafficRequest);
                request.TotalTrucksInDesignLaneOverDesignLife = truckTrafficResponse.TotalTrucks;

                JpcpThicknessResponse JpcpThicknessResponse = CalculateJpcpThickness(request);
                ReferencePoint.DesignLife = 20;
                ReferencePoint.Thickness  = Convert.ToDouble(JpcpThicknessResponse.UndoweledThickness.DesignThickness);
            }
            return new JpcpDesignLifeSensitivityResponse() {
                DoweledDataPoints       = DoweledDataPoints,
                UndoweledDataPoints     = UndoweledDataPoints,
                UndoweledReferencePoint = ReferencePoint,
                Increment               = increment
            };
        }
    }
}
