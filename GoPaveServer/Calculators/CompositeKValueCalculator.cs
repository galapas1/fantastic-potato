using GoPaveServer.Models;
using GoPaveServer.Services;
using GoPaveServer.Utils;
using System;
using Newtonsoft.Json;

namespace GoPaveServer.Calculators
{
    public class CompositeKValueCalculator
    {
        private static double zeroSubbaseLayersKValue(CompositeKValueRequest request)
        {
            double kValue = 0.0;
            if (request.MrsgValue < 15089)
            {
                kValue = request.MrsgValue / (
                    0.0000001155 * Math.Pow(request.MrsgValue, 2.0) - 0.0004683533 * request.MrsgValue + 41.1348117373
                );
            }
            else
            {
                kValue = request.MrsgValue / (
                    0.0000000106 * Math.Pow(request.MrsgValue, 2.0) - 0.0007608054 * request.MrsgValue + 69.4602909796
                );
            }
            return kValue;
        }

        private static double oneSubbaseLayerKValue(CompositeKValueRequest request)
        {
            double kValue = request.MrsgValue;
            return Utils.Calculators.subbaseLayerKValue(request.LayerThickness[0], request.ModulusOfElasticity[0], kValue);
        }

        private static double twoSubbaseLayersKValue(CompositeKValueRequest request, double kValue)
        {
            kValue = kValue * 19.4;
            return Utils.Calculators.subbaseLayerKValue(request.LayerThickness[1], request.ModulusOfElasticity[1], kValue);
        }

        private static double threeSubbaseLayersKValue(CompositeKValueRequest request, double kValue)
        {
            kValue = kValue * 19.4;
            return Utils.Calculators.subbaseLayerKValue(request.LayerThickness[2], request.ModulusOfElasticity[2], kValue);
        }

        public static CompositeKValueResponse CalculateCompositeKValue(CompositeKValueRequest request)
        {
            CompositeKValueResponse response = new CompositeKValueResponse();

            double mrsgConversionFactor      = 1.0,
                   thicknessConversionFactor = 1.0,
                   kConverstionFactor        = 1.0;

            if (request.ConvertToMetric)
            {
                mrsgConversionFactor      = 145.03263223;
                thicknessConversionFactor = 0.03937;
                kConverstionFactor        = 3.683;
            }

            request.MrsgValue *= mrsgConversionFactor;

            for (int indx = 0; indx < request.NumberOfSubLayers; ++indx)
            {
                request.ModulusOfElasticity[indx] *= mrsgConversionFactor;
                request.LayerThickness     [indx] *= thicknessConversionFactor;
            }

            double kValue = 0.0;
            switch (request.NumberOfSubLayers)
            {
                case 0:
                    kValue = zeroSubbaseLayersKValue(request);
                    break;

                case 1:
                    kValue = oneSubbaseLayerKValue(request);
                    break;
                case 2:
                    kValue = twoSubbaseLayersKValue(request, oneSubbaseLayerKValue(request));
                    break;
                case 3:
                    kValue = threeSubbaseLayersKValue(request, twoSubbaseLayersKValue(request, oneSubbaseLayerKValue(request)));
                    break;
                default:
                    throw new ArgumentException("Invalid Number of SubLayers, must be between 0 and 3");
            }

            response.CompositeKValueOfSubstructure = Utils.Calculators.toInt(kValue).ToString("N0");
            if(request.ConvertToMetric)
            {
                response.CompositeKValueOfSubstructure = (kValue / kConverstionFactor).ToString("N1");
            }
            return response;
        }

        public static KValueSensitivityResponse PlotKValueSensitivity(KValueSensitivityRequest request)
        {
            const int KValueStartRange = 50;
            const int KValueEndRange   = 600;

            int increment = 50;
            if(!(request.Increment == null || request.Increment == 0))
            {
                increment = request.Increment.Value;
            }

            int arrayLength = ((KValueEndRange - KValueStartRange) / increment) + 1;
            KValueSensitivity[] dataPoints = new KValueSensitivity[arrayLength];

            for(int indx = 0, step = KValueStartRange; step <= KValueEndRange; indx +=1, step += increment)
            {
                request.CompositeKValueOfSubstructure = step;
                CrcpThicknessResponse resp = CrcpCalculatorService.CalculateCrcpThickness(request);
                dataPoints[indx] = new KValueSensitivity();
                dataPoints[indx].KValue    = step;
                dataPoints[indx].Thickness = Convert.ToDouble(resp.DesignThickness);
            }
            return new KValueSensitivityResponse() {
                DataPoints = dataPoints,
                Increment  = increment
            };
        }
    }
}

