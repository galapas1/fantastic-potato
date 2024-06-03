using GoPaveServer.Models;
using GoPaveServer.Services;
using System;
using Newtonsoft.Json;

namespace GoPaveServer.Calculators
{
    public class DesignLifeCalculator
    {
        public static DesignLifeSensitivityResponse PlotDesignLifeSensitivity(DesignLifeSensitivityRequest request)
        {
            const int DesignLifeStartRange = 5;
            const int DesignLifeEndRange   = 75;

            int increment = 5;
            if(!(request.Increment == null || request.Increment == 0))
            {
                increment = request.Increment.Value;
            }

            int arrayLength = ((DesignLifeEndRange - DesignLifeStartRange) / increment) + 1;
            DesignLifeSensitivity[] dataPoints = new DesignLifeSensitivity[arrayLength];

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

                CrcpThicknessResponse CrcpThicknessResponse = CrcpCalculatorService.CalculateCrcpThickness(request);

                dataPoints[indx] = new DesignLifeSensitivity();
                dataPoints[indx].DesignLife = step;
                dataPoints[indx].Thickness  = Convert.ToDouble(CrcpThicknessResponse.DesignThickness);
            }
            return new DesignLifeSensitivityResponse() {
                DataPoints = dataPoints,
                Increment  = increment
            };
        }
    }
}
