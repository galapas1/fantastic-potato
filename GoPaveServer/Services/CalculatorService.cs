using GoPaveServer.Calculators;
using GoPaveServer.Interfaces;
using GoPaveServer.Models;
using System;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Http;

namespace GoPaveServer.Services
{
    public class CalculatorService : ICalculators
    {
        public TrafficTruckResponse CalculateTruckTraffic(TrafficTruckRequest request)
        {
            return TruckCalculatorService.CalculateTruckTraffic(request);
        }

        public AsphaltAnalysisResponse CalculateAsphaltAnalysis(AsphaltAnalysisRequest  request)
        {
            return AsphaltCalculatorService.CalculateAsphaltAnalysis(request);
        }

        public object CompositeWithAsphaltSurface(CompositeAsphaltRequest request)
        {
            return AsphaltCalculatorService.CompositeWithAsphaltSurface(request);
        }

        public object CompositeWithAsphaltSurfaceUsingIncrementalThickness(CompositeAsphaltRequest request, HttpContext httpContext)
        {
            return AsphaltCalculatorService.CompositeWithAsphaltSurfaceUsingIncrementalThickness(request, httpContext);
        }

        public MRSGResponse CalculateMrsgValue(MRSGRequest request)
        {
            return MrsgCalculator.CalculateMrsgValue(request);
        }

        public FlexuralStrengthResponse CalculateFlexuralStrength(FlexuralStrengthRequest request)
        {
            return FlexuralStrengthCalculator.CalculateFlexuralStrength(request);
        }

        public CompositeKValueResponse CalculateCompositeKValue(CompositeKValueRequest  request)
        {
            return CompositeKValueCalculator.CalculateCompositeKValue(request);
        }

        public MrsgUpdateWithCompositeKValueResponse MrsgUpdateWithCompositeKValue(MrsgUpdateWithCompositeKValueRequest request)
        {
            if(request == null)
            {
                throw new ArgumentException("malformed request");
            }

            MRSGRequest mrsgRequest = new MRSGRequest() {
                CaliforniaBearingRatio = request.CaliforniaBearingRatio,
                ResistanceValue        = request.ResistanceValue,
                MrsgValue              = request.MrsgValue,
                MrsgType               = request.MrsgType,
                ConvertToMetric        = request.ConvertToMetric
            };
            MRSGResponse mrsgResponse = MrsgCalculator.CalculateMrsgValue(mrsgRequest);

            CompositeKValueRequest kvalueRequest = new CompositeKValueRequest() {
                MrsgValue           = Double.Parse(mrsgResponse.MrsgValue),
                NumberOfSubLayers   = request.NumberOfSubLayers,
                LayerThickness      = request.LayerThickness,
                ModulusOfElasticity = request.ModulusOfElasticity,
                ConvertToMetric     = request.ConvertToMetric
            };

            CompositeKValueResponse kvalueResponse = CompositeKValueCalculator.CalculateCompositeKValue(kvalueRequest);

            return new MrsgUpdateWithCompositeKValueResponse() {
                MrsgValue                     = mrsgResponse.MrsgValue,
                CompositeKValueOfSubstructure = kvalueResponse.CompositeKValueOfSubstructure
            };
        }

        public CrcpThicknessResponse CalculateCrcpThickness(CrcpThicknessRequest request)
        {
            return CrcpCalculatorService.CalculateCrcpThickness(request);
        }

        private double calculateAllowableTruckDamage(CrcpThicknessRequest request, double thicknessDesign)
        {
            return TruckCalculatorService.CalculateAllowableTruckDamage(request, thicknessDesign);
        }

        public KValueSensitivityResponse PlotKValueSensitivity(KValueSensitivityRequest request)
        {
            return CompositeKValueCalculator.PlotKValueSensitivity(request);
        }

        public JpcpKValueSensitivityResponse PlotJpcpKValueSensitivity(JpcpKValueSensitivityRequest request)
        {
            return JpcpCalculatorService.PlotJpcpKValueSensitivity(request);
        }

        public ParkingKValueSensitivityResponse PlotParkingKValueSensitivity(ParkingKValueSensitivityRequest request)
        {
            return ParkingCalculatorService.PlotParkingKValueSensitivity(request);
        }

        public RccKValueSensitivityResponse PlotRccKValueSensitivity(RccKValueSensitivityRequest request)
        {
            return RccCalculatorService.PlotRccKValueSensitivity(request);
        }

        public object PlotOverlayKValueSensitivity(OverlayKValueSensitivityRequest request)
        {
            return OverlayCalculatorService.PlotOverlayKValueSensitivity(request);
        }

        public FlexuralStrengthSensitivityResponse PlotStrengthSensitivity(FlexuralStrengthSensitivityRequest request)
        {
            return FlexuralStrengthCalculator.PlotStrengthSensitivity(request);
        }

        public JpcpFlexuralStrengthSensitivityResponse PlotJpcpStrengthSensitivity(JpcpFlexuralStrengthSensitivityRequest request)
        {
            return JpcpCalculatorService.PlotJpcpStrengthSensitivity(request);
        }

        public ParkingFlexuralStrengthSensitivityResponse PlotParkingStrengthSensitivity(ParkingFlexuralStrengthSensitivityRequest request)
        {
            return ParkingCalculatorService.PlotParkingStrengthSensitivity(request);
        }

        public RccFlexuralStrengthSensitivityResponse PlotRccStrengthSensitivity(RccFlexuralStrengthSensitivityRequest request)
        {
            return RccCalculatorService.PlotRccStrengthSensitivity(request);
        }

        public object PlotOverlayStrengthSensitivity(OverlayFlexuralStrengthSensitivityRequest request)
        {
            return OverlayCalculatorService.PlotOverlayStrengthSensitivity(request);
        }

        public JpcpSlabsCrackedSensitivityResponse PlotJpcpSlabsCrackedSensitivity(JpcpSlabsCrackedSensitivityRequest request)
        {
            return JpcpCalculatorService.PlotJpcpSlabsCrackedSensitivity(request);
        }

        public ParkingSlabsCrackedSensitivityResponse PlotParkingSlabsCrackedSensitivity(ParkingSlabsCrackedSensitivityRequest request)
        {
            return ParkingCalculatorService.PlotParkingSlabsCrackedSensitivity(request);
        }

        public RccSlabsCrackedSensitivityResponse PlotRccSlabsCrackedSensitivity(RccSlabsCrackedSensitivityRequest request)
        {
            return RccCalculatorService.PlotRccSlabsCrackedSensitivity(request);
        }

        public object PlotOverlaySlabsCrackedSensitivity(OverlaySlabsCrackedSensitivityRequest request)
        {
            return OverlayCalculatorService.PlotOverlaySlabsCrackedSensitivity(request);
        }

        public ReliabilitySensitivityResponse PlotReliabilitySensitivity(ReliabilitySensitivityRequest request)
        {
            return ReliabilityCalculator.PlotReliabilitySensitivity(request);
        }

        public JpcpReliabilitySensitivityResponse PlotJpcpReliabilitySensitivity(JpcpReliabilitySensitivityRequest request)
        {
            return JpcpCalculatorService.PlotJpcpReliabilitySensitivity(request);
        }

        public ParkingReliabilitySensitivityResponse PlotParkingReliabilitySensitivity(ParkingReliabilitySensitivityRequest request)
        {
            return ParkingCalculatorService.PlotParkingReliabilitySensitivity(request);
        }

        public RccReliabilitySensitivityResponse PlotRccReliabilitySensitivity(RccReliabilitySensitivityRequest request)
        {
            return RccCalculatorService.PlotRccReliabilitySensitivity(request);
        }

        public object PlotOverlayReliabilitySensitivity(OverlayReliabilitySensitivityRequest request)
        {
            return OverlayCalculatorService.PlotOverlayReliabilitySensitivity(request);
        }

        public DesignLifeSensitivityResponse PlotDesignLifeSensitivity(DesignLifeSensitivityRequest request)
        {
            return DesignLifeCalculator.PlotDesignLifeSensitivity(request);
        }

        public JpcpDesignLifeSensitivityResponse PlotJpcpDesignLifeSensitivity(JpcpDesignLifeSensitivityRequest request)
        {
            return JpcpCalculatorService.PlotJpcpDesignLifeSensitivity(request);
        }

        public ParkingDesignLifeSensitivityResponse PlotParkingDesignLifeSensitivity(ParkingDesignLifeSensitivityRequest request)
        {
            return ParkingCalculatorService.PlotParkingDesignLifeSensitivity(request);
        }

        public RccDesignLifeSensitivityResponse PlotRccpDesignLifeSensitivity(RccDesignLifeSensitivityRequest request)
        {
            return RccCalculatorService.PlotRccpDesignLifeSensitivity(request);
        }

        public object PlotOverlayDesignLifeSensitivity(OverlayDesignLifeSensitivityRequest request)
        {
            return OverlayCalculatorService.PlotOverlayDesignLifeSensitivity(request);
        }

        public JpcpThicknessResponse CalculateJpcpThickness(ThicknessRequest request)
        {
            return JpcpCalculatorService.CalculateJpcpThickness(request);
        }

        public ParkingThicknessResponse CalculateParkingThickness(ParkingThicknessRequest request)
        {
            return ParkingCalculatorService.CalculateParkingThickness(request);
        }

        public RccThicknessResponse CalculateRccThickness(ThicknessRequest request)
        {
            return RccCalculatorService.CalculateRccThickness(request);
        }

        public object CalculateOverlayThickness(OverlayThicknessRequest request)
        {
            return OverlayCalculatorService.CalculateOverlayThickness(request);
        }

        public IntermodalThicknessResponse CalculateIntermodalThickness(IntermodalThicknessRequest request)
        {
            return IntermodalThicknessCalculator.CalculateIntermodalThickness(request);
        }

        public CrcpSteelResponse CalculateCrcpSteel(CrcpSteelRequest request)
        {
            return CrcpCalculatorService.CalculateCrcpSteel(request);
        }

        public EffectiveThicknessResponse CalculateEffectiveThickness(EffectiveThicknessRequest request)
        {
            if(request.JointCrackingAdjustmentFactor == 0)
            {
                request.JointCrackingAdjustmentFactor = 1;
            }
            if(request.FatigueAdjustmentFactor == 0)
            {
                request.FatigueAdjustmentFactor = 1;
            }
            if(request.DurabilityAdjustmentFactor == 0)
            {
                request.DurabilityAdjustmentFactor = 1;
            }

            double effectiveThickness = request.ExistingThickness * request.JointCrackingAdjustmentFactor;

            if(request.IsBonded) {
                effectiveThickness *= request.FatigueAdjustmentFactor * request.DurabilityAdjustmentFactor;
            }
            return new EffectiveThicknessResponse() {
                EffectiveThickness = effectiveThickness.ToString("N2")
            };
        }

		public JointCrackingAdjustmentFactorResponse CalculateJointCrackingAdjustmentFactor(JointCrackingAdjustmentFactorRequest request)
		{
			double jointFactorAdjustmentFactor = 0;

			jointFactorAdjustmentFactor =
				(-0.00000002 * Math.Pow(request.JointCrackingTimeToLive,3)) +
                ( 0.000007   * Math.Pow(request.JointCrackingTimeToLive,2)) - (0.0011 * request.JointCrackingTimeToLive) + 0.9983;

			if(request.IsBonded)
            {
				if(request.JointCrackingTimeToLive >= 0 && request.JointCrackingTimeToLive <= 135)
                {
					jointFactorAdjustmentFactor = (-0.00232 * request.JointCrackingTimeToLive) + 1;
				}
				else
                {
					if(request.JointCrackingTimeToLive > 135)
                    {
						jointFactorAdjustmentFactor = (-0.00195 * request.JointCrackingTimeToLive) + 0.95;
					}
				}
			}
            if(jointFactorAdjustmentFactor < 0.55)
                {
					jointFactorAdjustmentFactor = 0.55;
				}
			return new JointCrackingAdjustmentFactorResponse() {
				JointCrackingAdjustmentFactor = Math.Round(jointFactorAdjustmentFactor, 2)
			};
		}

        public JointCrackingWithThicknessResponse
            CalculateJointCrackingWithEffectiveThickness(JointCrackingWithThicknessRequest request)
         {
             JointCrackingAdjustmentFactorRequest jCAFRequest = new JointCrackingAdjustmentFactorRequest() {
                 JointCrackingTimeToLive = request.JointCrackingTimeToLive
             };
             JointCrackingAdjustmentFactorResponse jCAFResponse =
                 CalculateJointCrackingAdjustmentFactor(jCAFRequest);

             JointCrackingWithThicknessResponse response = new JointCrackingWithThicknessResponse() {
                 JointCrackingAdjustmentFactor = jCAFResponse.JointCrackingAdjustmentFactor
             };

             request.JointCrackingAdjustmentFactor = jCAFResponse.JointCrackingAdjustmentFactor;
             EffectiveThicknessResponse efResponse = CalculateEffectiveThickness(request);
             response.EffectiveThickness = efResponse.EffectiveThickness;

             return response;
        }
    }
}
