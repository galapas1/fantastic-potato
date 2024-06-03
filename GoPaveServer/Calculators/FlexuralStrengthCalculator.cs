using GoPaveServer.Models;
using GoPaveServer.Services;
using GoPaveServer.Utils;
using System;
using Newtonsoft.Json;

namespace GoPaveServer.Calculators
{
    public class FlexuralStrengthCalculator
    {
        public static FlexuralStrengthResponse CalculateFlexuralStrength(FlexuralStrengthRequest request)
        {
            FlexuralStrengthResponse response = new FlexuralStrengthResponse();
            double flexuralStrength = 0.0;

            switch (request.StrengthType)
            {
                case StrengthType.FlexStrength28Day:
                    flexuralStrength = request.FlexStrength28Day;
                    break;

                case StrengthType.CompressiveStrength:
                    {
                        flexuralStrength = (
                            request.ConvertToMetric ? 0.445 : 2.3
                        ) * Math.Pow(request.CompressiveStrength, 2.0 / 3.0);
                    }
                    break;

                case StrengthType.SplitTensileStrength:
                    {
                        flexuralStrength = request.SplitTensileStrength + (
                            request.ConvertToMetric ? 1.72369 : 250
                        );
                    }
                    break;

                case StrengthType.ModulusOfElasticity:
                    {
                        flexuralStrength = (request.ModulusOfElasticity / (2.3 * Math.Pow(10.0, 4.0))) + (
                            request.ConvertToMetric ? 3.36809 : 488.5
                        );
                    }
                    break;

                default:
                    break;
            }
            response.CalculatedFlexuralStrength = Utils.Calculators.toInt
            (
                flexuralStrength
            ).ToString("N0");
            return response;
        }

        public static FlexuralStrengthSensitivityResponse PlotStrengthSensitivity(FlexuralStrengthSensitivityRequest request)
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
            FlexuralStrengthSensitivity[] dataPoints = new FlexuralStrengthSensitivity[arrayLength];

            for(double indx = 0, step = FlexuralStrengthStartRange; step <= FlexuralStrengthEndRange; indx +=1, step += increment)
            {
                request.FlexuralStrength = step;
                CrcpThicknessResponse resp = CrcpCalculatorService.CalculateCrcpThickness(request);

                dataPoints[(int)indx] = new FlexuralStrengthSensitivity();
                dataPoints[(int)indx].FlexuralStrength = Math.Round(step,1);
                dataPoints[(int)indx].Thickness        = Convert.ToDouble(resp.DesignThickness);
            }
            return new FlexuralStrengthSensitivityResponse() {
                DataPoints = dataPoints,
                Increment  = increment
            };
        }
    }
}
