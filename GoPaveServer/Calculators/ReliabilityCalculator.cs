using GoPaveServer.Models;
using GoPaveServer.Services;
using System;
using Newtonsoft.Json;

namespace GoPaveServer.Calculators
{
    public class ReliabilityCalculator
    {
        public static ReliabilitySensitivityResponse PlotReliabilitySensitivity(ReliabilitySensitivityRequest request)
        {
            const int ReliabilityStartRange = 50;
            const int ReliabilityEndRange   = 100;

            int increment = 5;
            if(!(request.Increment == null || request.Increment == 0))
            {
                increment = request.Increment.Value;
            }

            int arrayLength = ((ReliabilityEndRange - ReliabilityStartRange) / increment) + 1;
            ReliabilitySensitivity[] dataPoints = new ReliabilitySensitivity[arrayLength];

            for(int indx = 0, step = ReliabilityStartRange; step <= ReliabilityEndRange; indx +=1, step += increment)
            {
                request.Reliability = (step == 100 ? 99.99 : step);
                CrcpThicknessResponse resp = CrcpCalculatorService.CalculateCrcpThickness(request);

                dataPoints[indx] = new ReliabilitySensitivity();
                dataPoints[indx].Reliability = (step == 100 ? 99.99 : step);
                dataPoints[indx].Thickness   = Convert.ToDouble(resp.DesignThickness);
            }
            return new ReliabilitySensitivityResponse() {
                DataPoints = dataPoints,
                Increment  = increment
            };
        }
    }
}
