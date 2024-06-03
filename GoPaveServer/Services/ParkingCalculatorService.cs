using GoPaveServer.Models;
using GoPaveServer.Calculators;
using GoPaveServer.Services;
using System;
using Newtonsoft.Json;

namespace GoPaveServer.Services
{
    public class ParkingCalculatorService
    {
        public static ParkingThicknessResponse CalculateParkingThickness(ParkingThicknessRequest request)
        {
            request.PavementType = 2;

            request.TotalTrucksInDesignLaneOverDesignLife = request.TrucksPerDay * request.DesignLife * 365.25;
            request.DoweledPavement = false;
            request.EdgeSupport = true;

            return new ParkingThicknessResponse() {
                UndoweledThickness = ThicknessCalculator.CalculateThickness(request)
            };
        }

        public static ParkingKValueSensitivityResponse PlotParkingKValueSensitivity(ParkingKValueSensitivityRequest request)
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
                ParkingThicknessResponse resp = CalculateParkingThickness(request);
                UndoweledDataPoints[indx] = new KValueSensitivity();
                UndoweledDataPoints[indx].KValue    = step;
                UndoweledDataPoints[indx].Thickness = Convert.ToDouble(resp.UndoweledThickness.DesignThickness);
            }
            return new ParkingKValueSensitivityResponse() {
                UndoweledDataPoints = UndoweledDataPoints,
                Increment  = increment
            };
        }

        public static ParkingFlexuralStrengthSensitivityResponse PlotParkingStrengthSensitivity(ParkingFlexuralStrengthSensitivityRequest request)
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
                ParkingThicknessResponse resp = CalculateParkingThickness(request);
                UndoweledDataPoints[(int)indx] = new FlexuralStrengthSensitivity();
                UndoweledDataPoints[(int)indx].FlexuralStrength = Math.Round(step,1);
                UndoweledDataPoints[(int)indx].Thickness        = Convert.ToDouble(resp.UndoweledThickness.DesignThickness);
            }
            return new ParkingFlexuralStrengthSensitivityResponse() {
                UndoweledDataPoints = UndoweledDataPoints,
                Increment  = increment
            };
        }

        public static ParkingSlabsCrackedSensitivityResponse PlotParkingSlabsCrackedSensitivity(ParkingSlabsCrackedSensitivityRequest request)
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
                ParkingThicknessResponse response = CalculateParkingThickness(request);

                dataPoints[(int)indx] = new SlabsCrackedSensitivity();
                dataPoints[(int)indx].SlabsCracked = (int)step;
                dataPoints[(int)indx].Thickness = Convert.ToDouble(response.UndoweledThickness.ThicknessDesign);
            }
            return new ParkingSlabsCrackedSensitivityResponse() {
                UndoweledDataPoints = dataPoints,
                Increment  = increment
            };
        }

        public static ParkingReliabilitySensitivityResponse PlotParkingReliabilitySensitivity(ParkingReliabilitySensitivityRequest request)
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
                ParkingThicknessResponse resp = CalculateParkingThickness(request);
                UndoweledDataPoints[indx] = new ReliabilitySensitivity();
                UndoweledDataPoints[indx].Reliability = (step == 100 ? 99.99 : step);
                UndoweledDataPoints[indx].Thickness   = Convert.ToDouble(resp.UndoweledThickness.DesignThickness);
            }
            ReliabilitySensitivity ReferencePoint = new ReliabilitySensitivity();
            {
                request.Reliability = 95;
                ParkingThicknessResponse resp = CalculateParkingThickness(request);
                ReferencePoint.Reliability = 95;
                ReferencePoint.Thickness   = Convert.ToDouble(resp.UndoweledThickness.DesignThickness);
            }
            return new ParkingReliabilitySensitivityResponse() {
                UndoweledDataPoints = UndoweledDataPoints,
                UndoweledReferencePoint = ReferencePoint,
                Increment  = increment
            };
        }

        public static ParkingDesignLifeSensitivityResponse PlotParkingDesignLifeSensitivity(ParkingDesignLifeSensitivityRequest request)
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
                request.DesignLife = step;
                ParkingThicknessResponse ParkingThicknessResponse = CalculateParkingThickness(request);
                UndoweledDataPoints[indx] = new DesignLifeSensitivity();
                UndoweledDataPoints[indx].DesignLife = step;
                UndoweledDataPoints[indx].Thickness  = Convert.ToDouble(ParkingThicknessResponse.UndoweledThickness.DesignThickness);
            }
            DesignLifeSensitivity ReferencePoint = new DesignLifeSensitivity();
            {
                ParkingThicknessResponse parkingThicknessResponse = CalculateParkingThickness(request);
                ReferencePoint.DesignLife = 20;
                ReferencePoint.Thickness  = Convert.ToDouble(parkingThicknessResponse.UndoweledThickness.DesignThickness);
            }
            return new ParkingDesignLifeSensitivityResponse() {
                UndoweledDataPoints = UndoweledDataPoints,
                UndoweledReferencePoint = ReferencePoint,
                Increment  = increment
            };
        }
    }
}
