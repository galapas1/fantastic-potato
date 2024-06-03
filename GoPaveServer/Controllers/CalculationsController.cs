using GoPaveServer.Data;
using GoPaveServer.Interfaces;
using GoPaveServer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;

using Newtonsoft.Json;

namespace GoPaveServer.Controllers
{
    [RouteAttribute("/api/calculations/")]
    [AllowAnonymous]
    public class CalculationsController : BaseController
    {
        private readonly ICalculators calculator;
        public CalculationsController(ICalculators                 calculator,
                                      UserContext                  userContext,
                                      ILoggerFactory               loggerFactory) : base(userContext,
                                                                                         loggerFactory)
        {
            this.calculator = calculator;
        }

        [HttpPost("TruckTraffic")]
        [EnableCors("CorsPolicy")]
        public object TrafficTruckCalculation([FromBody]TrafficTruckRequest request)
        {
            return calculator.CalculateTruckTraffic(request);
        }

        [HttpPost("AsphaltAnalysis")]
        [EnableCors("CorsPolicy")]
        public object AsphaltAnalysisCalculation([FromBody]AsphaltAnalysisRequest request)
        {
            return calculator.CalculateAsphaltAnalysis(request);
        }

        [HttpPost("CompositeWithAsphaltSurface")]
        [EnableCors("CorsPolicy")]
        public object CompositeWithAsphaltSurface([FromBody]CompositeAsphaltRequest request)
        {
            return calculator.CompositeWithAsphaltSurface(request);
        }

        [HttpPost("CompositeWithAsphaltSurfaceUsingIncrementalThickness")]
        [EnableCors("CorsPolicy")]
        public object CompositeWithAsphaltSurfaceUsingIncrementalThickness([FromBody]CompositeAsphaltRequest request)
        {
            return calculator.CompositeWithAsphaltSurfaceUsingIncrementalThickness(request, HttpContext);
        }

        [HttpPost("MrsgValue")]
        [EnableCors("CorsPolicy")]
        public object MrsgValueCalculation([FromBody]MRSGRequest request)
        {
            return calculator.CalculateMrsgValue(request);
        }

        [HttpPost("FlexuralStrength")]
        [EnableCors("CorsPolicy")]
        public object FlexuralStrengthCalculation([FromBody]FlexuralStrengthRequest request)
        {
            return calculator.CalculateFlexuralStrength(request);
        }

        [HttpPost("CompositeKValueOfSubstructure")]
        [EnableCors("CorsPolicy")]
        public object CompositeKValueOfSubstructure([FromBody]CompositeKValueRequest request)
        {
            return calculator.CalculateCompositeKValue(request);
        }

        [HttpPost("MrsgUpdateWithCompositeKValue")]
        [EnableCors("CorsPolicy")]
        public object MrsgUpdateWithCompositeKValue([FromBody]MrsgUpdateWithCompositeKValueRequest request)
        {
            return calculator.MrsgUpdateWithCompositeKValue(request);
        }

        [HttpPost("PlotCrcpKValueSensitivity")]
        [EnableCors("CorsPolicy")]
        public object PlotCrcpKValueSensitivity([FromBody]KValueSensitivityRequest request)
        {
            return calculator.PlotKValueSensitivity(request);
        }

        [HttpPost("PlotJpcpKValueSensitivity")]
        [EnableCors("CorsPolicy")]
        public object PlotJpcpKValueSensitivity([FromBody]JpcpKValueSensitivityRequest request)
        {
            return calculator.PlotJpcpKValueSensitivity(request);
        }

        [HttpPost("PlotParkingKValueSensitivity")]
        [EnableCors("CorsPolicy")]
        public object PlotParkingKValueSensitivity([FromBody]ParkingKValueSensitivityRequest request)
        {
            return calculator.PlotParkingKValueSensitivity(request);
        }


        [HttpPost("PlotRccKValueSensitivity")]
        [EnableCors("CorsPolicy")]
        public object PlotRccKValueSensitivity([FromBody]RccKValueSensitivityRequest request)
        {
            return calculator.PlotRccKValueSensitivity(request);
        }

        [HttpPost("PlotCrcpStrengthSensitivity")]
        [EnableCors("CorsPolicy")]
        public object PlotCrcpStrengthSensitivity([FromBody]FlexuralStrengthSensitivityRequest request)
        {
            return calculator.PlotStrengthSensitivity(request);
        }

        [HttpPost("PlotJpcpStrengthSensitivity")]
        [EnableCors("CorsPolicy")]
        public object PlotJpcpStrengthSensitivity([FromBody]JpcpFlexuralStrengthSensitivityRequest request)
        {
            return calculator.PlotJpcpStrengthSensitivity(request);
        }

        [HttpPost("PlotParkingStrengthSensitivity")]
        [EnableCors("CorsPolicy")]
        public object PlotParkingStrengthSensitivity([FromBody]ParkingFlexuralStrengthSensitivityRequest request)
        {
            return calculator.PlotParkingStrengthSensitivity(request);
        }

        [HttpPost("PlotRccStrengthSensitivity")]
        [EnableCors("CorsPolicy")]
        public object PlotRccStrengthSensitivity([FromBody]RccFlexuralStrengthSensitivityRequest request)
        {
            return calculator.PlotRccStrengthSensitivity(request);
        }

        [HttpPost("PlotCrcpReliabilitySensitivity")]
        [EnableCors("CorsPolicy")]
        public object PlotCrcpReliabilitySensitivity([FromBody]ReliabilitySensitivityRequest request)
        {
            return calculator.PlotReliabilitySensitivity(request);
        }

        [HttpPost("PlotJpcpReliabilitySensitivity")]
        [EnableCors("CorsPolicy")]
        public object PlotJpcpReliabilitySensitivity([FromBody]JpcpReliabilitySensitivityRequest request)
        {
            return calculator.PlotJpcpReliabilitySensitivity(request);
        }

        [HttpPost("PlotParkingReliabilitySensitivity")]
        [EnableCors("CorsPolicy")]
        public object PlotParkingReliabilitySensitivity([FromBody]ParkingReliabilitySensitivityRequest request)
        {
            return calculator.PlotParkingReliabilitySensitivity(request);
        }

        [HttpPost("PlotRccReliabilitySensitivity")]
        [EnableCors("CorsPolicy")]
        public object PlotRccReliabilitySensitivity([FromBody]RccReliabilitySensitivityRequest request)
        {
            return calculator.PlotRccReliabilitySensitivity(request);
        }

        [HttpPost("PlotCrcpDesignLifeSensitivity")]
        [EnableCors("CorsPolicy")]
        public object PlotCrcpDesignLifeSensitivity([FromBody]DesignLifeSensitivityRequest request)
        {
            return calculator.PlotDesignLifeSensitivity(request);
        }

        [HttpPost("PlotJpcpDesignLifeSensitivity")]
        [EnableCors("CorsPolicy")]
        public object PlotJpcpDesignLifeSensitivity([FromBody]JpcpDesignLifeSensitivityRequest request)
        {
            return calculator.PlotJpcpDesignLifeSensitivity(request);
        }

        [HttpPost("PlotJpcpSlabsCrackedSensitivity")]
        [EnableCors("CorsPolicy")]
        public object PlotJpcpSlabsCrackedSensitivity([FromBody]JpcpSlabsCrackedSensitivityRequest request)
        {
            return calculator.PlotJpcpSlabsCrackedSensitivity(request);
        }

        [HttpPost("PlotParkingSlabsCrackedSensitivity")]
        [EnableCors("CorsPolicy")]
        public object PlotParkingSlabsCrackedSensitivity([FromBody]ParkingSlabsCrackedSensitivityRequest request)
        {
            return calculator.PlotParkingSlabsCrackedSensitivity(request);
        }

        [HttpPost("PlotRccSlabsCrackedSensitivity")]
        [EnableCors("CorsPolicy")]
        public object PlotRccSlabsCrackedSensitivity([FromBody]RccSlabsCrackedSensitivityRequest request)
        {
            return calculator.PlotRccSlabsCrackedSensitivity(request);
        }

        [HttpPost("PlotParkingDesignLifeSensitivity")]
        [EnableCors("CorsPolicy")]
        public object PlotParkingDesignLifeSensitivity([FromBody]ParkingDesignLifeSensitivityRequest request)
        {
            return calculator.PlotParkingDesignLifeSensitivity(request);
        }

        [HttpPost("PlotRccDesignLifeSensitivity")]
        [EnableCors("CorsPolicy")]
        public object PlotRccDesignLifeSensitivity([FromBody]RccDesignLifeSensitivityRequest request)
        {
            return calculator.PlotRccpDesignLifeSensitivity(request);
        }

        [HttpPost("PlotOverlayKValueSensitivity")]
        [EnableCors("CorsPolicy")]
        public object PlotOverlayKValueSensitivity([FromBody]OverlayKValueSensitivityRequest request) {
            return calculator.PlotOverlayKValueSensitivity(request);
        }

        [HttpPost("PlotOverlayStrengthSensitivity")]
        [EnableCors("CorsPolicy")]
        public object PlotOverlayStrengthSensitivity([FromBody]OverlayFlexuralStrengthSensitivityRequest request) {
            return calculator.PlotOverlayStrengthSensitivity(request);
        }

        [HttpPost("PlotOverlayReliabilitySensitivity")]
        [EnableCors("CorsPolicy")]
        public object PlotOverlayReliabilitySensitivity([FromBody]OverlayReliabilitySensitivityRequest request) {
            return calculator.PlotOverlayReliabilitySensitivity(request);
        }

        [HttpPost("PlotOverlayDesignLifeSensitivity")]
        [EnableCors("CorsPolicy")]
        public object PlotOverlayDesignLifeSensitivity([FromBody]OverlayDesignLifeSensitivityRequest request) {
            return calculator.PlotOverlayDesignLifeSensitivity(request);
        }

        [HttpPost("PlotOverlaySlabsCrackedSensitivity")]
        [EnableCors("CorsPolicy")]
        public object PlotOverlaySlabsCrackedSensitivity([FromBody]OverlaySlabsCrackedSensitivityRequest request) {
            return calculator.PlotOverlaySlabsCrackedSensitivity(request);
        }

        [HttpPost("CrcpThickness")]
        [EnableCors("CorsPolicy")]
        public object CalculateCrcpThickness([FromBody]CrcpThicknessRequest request)
        {
            return calculator.CalculateCrcpThickness(request);
        }

        [HttpPost("JpcpThickness")]
        [EnableCors("CorsPolicy")]
        public object CalculateJpcpThickness([FromBody]JpcpThicknessRequest request)
        {
            return calculator.CalculateJpcpThickness(request);
        }

        [HttpPost("ParkingThickness")]
        [EnableCors("CorsPolicy")]
        public object CalculateParkingThickness([FromBody]ParkingThicknessRequest request)
        {
            return calculator.CalculateParkingThickness(request);
        }

        [HttpPost("RccThickness")]
        [EnableCors("CorsPolicy")]
        public object CalculateRccThickness([FromBody]RccThicknessRequest request)
        {
            return calculator.CalculateRccThickness(request);
        }

        [HttpPost("OverlayThickness")]
        [EnableCors("CorsPolicy")]
        public object CalculateOverlayThickness([FromBody]OverlayThicknessRequest request)
        {
            return calculator.CalculateOverlayThickness(request);
        }

        [HttpPost("IntermodalThickness")]
        [EnableCors("CorsPolicy")]
        public IntermodalThicknessResponse CalculateIntermodalThickness([FromBody]IntermodalThicknessRequest request)
        {
            return calculator.CalculateIntermodalThickness(request);
        }

        [HttpPost("CrcpSteel")]
        [EnableCors("CorsPolicy")]
        public object CalculateCrcpSteel([FromBody]CrcpSteelRequest request)
        {
             return calculator.CalculateCrcpSteel(request);
        }

        [HttpPost("JointCrackingAdjustmentFactor")]
        [EnableCors("CorsPolicy")]
        public JointCrackingAdjustmentFactorResponse CalculateJointCrackingAdjustmentFactor([FromBody]JointCrackingAdjustmentFactorRequest request)
        {
            return calculator.CalculateJointCrackingAdjustmentFactor(request);
        }

        [HttpPost("EffectiveThickness")]
        [EnableCors("CorsPolicy")]
        public EffectiveThicknessResponse CalculateEffectiveThickness([FromBody]EffectiveThicknessRequest request)
        {
            return calculator.CalculateEffectiveThickness(request);
        }

        [HttpPost("JointCrackingAFWithEffectiveThickness")]
        [EnableCors("CorsPolicy")]
        public JointCrackingWithThicknessResponse CalculateJointCrackingWithEffectiveThickness([FromBody]JointCrackingWithThicknessRequest request)
        {
            return calculator.CalculateJointCrackingWithEffectiveThickness(request);
        }
    }
}
