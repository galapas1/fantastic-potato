using GoPaveServer.Models;
using GoPaveServer.Utils;
using System;
using Newtonsoft.Json;

namespace GoPaveServer.Calculators
{
    public class MrsgCalculator
    {
        public static MRSGResponse CalculateMrsgValue(MRSGRequest request)
        {
            MRSGResponse response = new MRSGResponse();
            double mrsgValue = 0.0,
                   metricConversionFactor = 1.0;

            if(request.ConvertToMetric)
            {
                metricConversionFactor = 6.895 / 1000.0;
            }

            switch(request.MrsgType)
            {
                case MrsgType.ConvertCBR:
                    mrsgValue =  1941.488 * Math.Pow(request.CaliforniaBearingRatio, 0.6844709);
                    break;

                case MrsgType.ConvertRValue:
                    mrsgValue = 2165.935 * Math.Exp(0.0343507 * request.ResistanceValue);
                    break;

                case MrsgType.KnownMRSG:
                    mrsgValue = request.MrsgValue;
                    break;

                default:
                    break;

            }
            response.MrsgValue = Utils.Calculators.toInt
            (
                mrsgValue * metricConversionFactor
            ).ToString("N0");
            return response;
        }
    }
}
