using GoPaveServer.Models;
using Microsoft.AspNetCore.Http;

namespace GoPaveServer.Interfaces
{
    public interface ICalculators
    {
        object CompositeWithAsphaltSurface(CompositeAsphaltRequest request);
        object CompositeWithAsphaltSurfaceUsingIncrementalThickness(CompositeAsphaltRequest request, HttpContext httpContext);

        TrafficTruckResponse      CalculateTruckTraffic    (TrafficTruckRequest     request);
        AsphaltAnalysisResponse   CalculateAsphaltAnalysis (AsphaltAnalysisRequest  request);
        MRSGResponse              CalculateMrsgValue       (MRSGRequest             request);
        FlexuralStrengthResponse  CalculateFlexuralStrength(FlexuralStrengthRequest request);
        CompositeKValueResponse   CalculateCompositeKValue (CompositeKValueRequest  request);

        MrsgUpdateWithCompositeKValueResponse MrsgUpdateWithCompositeKValue(MrsgUpdateWithCompositeKValueRequest request);

        CrcpThicknessResponse    CalculateCrcpThickness   (CrcpThicknessRequest    request);
        JpcpThicknessResponse    CalculateJpcpThickness   (ThicknessRequest        request);
        ParkingThicknessResponse CalculateParkingThickness(ParkingThicknessRequest request);
        RccThicknessResponse     CalculateRccThickness    (ThicknessRequest        request);
        object                   CalculateOverlayThickness(OverlayThicknessRequest request);
        IntermodalThicknessResponse CalculateIntermodalThickness(IntermodalThicknessRequest request);

        KValueSensitivityResponse           PlotKValueSensitivity     (KValueSensitivityRequest              request);
        FlexuralStrengthSensitivityResponse PlotStrengthSensitivity   (FlexuralStrengthSensitivityRequest    request);
        ReliabilitySensitivityResponse      PlotReliabilitySensitivity(ReliabilitySensitivityRequest         request);
        DesignLifeSensitivityResponse       PlotDesignLifeSensitivity (DesignLifeSensitivityRequest          request);

        JpcpKValueSensitivityResponse           PlotJpcpKValueSensitivity     (JpcpKValueSensitivityRequest           request);
        JpcpFlexuralStrengthSensitivityResponse PlotJpcpStrengthSensitivity   (JpcpFlexuralStrengthSensitivityRequest request);
        JpcpReliabilitySensitivityResponse      PlotJpcpReliabilitySensitivity(JpcpReliabilitySensitivityRequest      request);
        JpcpDesignLifeSensitivityResponse       PlotJpcpDesignLifeSensitivity(JpcpDesignLifeSensitivityRequest        request);

        ParkingKValueSensitivityResponse           PlotParkingKValueSensitivity     (ParkingKValueSensitivityRequest           request);
        ParkingFlexuralStrengthSensitivityResponse PlotParkingStrengthSensitivity   (ParkingFlexuralStrengthSensitivityRequest request);
        ParkingReliabilitySensitivityResponse      PlotParkingReliabilitySensitivity(ParkingReliabilitySensitivityRequest      request);
        ParkingDesignLifeSensitivityResponse       PlotParkingDesignLifeSensitivity (ParkingDesignLifeSensitivityRequest       request);


        RccKValueSensitivityResponse           PlotRccKValueSensitivity     (RccKValueSensitivityRequest           request);
        RccFlexuralStrengthSensitivityResponse PlotRccStrengthSensitivity   (RccFlexuralStrengthSensitivityRequest request);
        RccReliabilitySensitivityResponse      PlotRccReliabilitySensitivity(RccReliabilitySensitivityRequest      request);
        RccDesignLifeSensitivityResponse       PlotRccpDesignLifeSensitivity(RccDesignLifeSensitivityRequest       request);

        CrcpSteelResponse CalculateCrcpSteel(CrcpSteelRequest request);

        JpcpSlabsCrackedSensitivityResponse    PlotJpcpSlabsCrackedSensitivity   (JpcpSlabsCrackedSensitivityRequest    request);
        ParkingSlabsCrackedSensitivityResponse PlotParkingSlabsCrackedSensitivity(ParkingSlabsCrackedSensitivityRequest request);
        RccSlabsCrackedSensitivityResponse     PlotRccSlabsCrackedSensitivity    (RccSlabsCrackedSensitivityRequest     request);

        object PlotOverlayKValueSensitivity(OverlayKValueSensitivityRequest request);
        object PlotOverlayStrengthSensitivity(OverlayFlexuralStrengthSensitivityRequest request);
        object PlotOverlayReliabilitySensitivity(OverlayReliabilitySensitivityRequest request);
        object PlotOverlayDesignLifeSensitivity(OverlayDesignLifeSensitivityRequest request);
        object PlotOverlaySlabsCrackedSensitivity(OverlaySlabsCrackedSensitivityRequest request);

        EffectiveThicknessResponse CalculateEffectiveThickness(EffectiveThicknessRequest request);
        JointCrackingAdjustmentFactorResponse
            CalculateJointCrackingAdjustmentFactor(JointCrackingAdjustmentFactorRequest request);

        JointCrackingWithThicknessResponse
            CalculateJointCrackingWithEffectiveThickness(JointCrackingWithThicknessRequest request);
    }
}
