using GoPaveServer.Models;
using GoPaveServer.Services;
using System;
using Newtonsoft.Json;

namespace GoPaveServer.Services
{
    public class OverlayCalculatorService
    {
        public static object PlotOverlayStrengthSensitivity(OverlayFlexuralStrengthSensitivityRequest request)
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

            for (double  indx = 0, step = FlexuralStrengthStartRange; step <= FlexuralStrengthEndRange; indx += 1, step += increment)
            {
                request.FlexuralStrength = step;
                var resp = CalculateOverlayThickness(request);

                if (request.IsBonded)
                {
                    RccThicknessResponse _resp = (RccThicknessResponse)resp;

                    UndoweledDataPoints[(int)indx] = new FlexuralStrengthSensitivity();
                    UndoweledDataPoints[(int)indx].FlexuralStrength = Math.Round(step,1);
                    UndoweledDataPoints[(int)indx].Thickness = Convert.ToDouble(_resp.UndoweledThickness.DesignThickness);
                }
                else
                {
                    JpcpThicknessResponse _resp = (JpcpThicknessResponse)resp;

                    DoweledDataPoints[(int)indx] = new FlexuralStrengthSensitivity();
                    DoweledDataPoints[(int)indx].FlexuralStrength = Math.Round(step,1);
                    DoweledDataPoints[(int)indx].Thickness = Convert.ToDouble(_resp.DoweledThickness.DesignThickness);

                    UndoweledDataPoints[(int)indx] = new FlexuralStrengthSensitivity();
                    UndoweledDataPoints[(int)indx].FlexuralStrength = Math.Round(step,1);
                    UndoweledDataPoints[(int)indx].Thickness = Convert.ToDouble(_resp.UndoweledThickness.DesignThickness);
                }
            }
            if (request.IsBonded)
            {
                return new RccFlexuralStrengthSensitivityResponse()
                {
                    UndoweledDataPoints = UndoweledDataPoints,
                    Increment = increment
                };
            }
            return new JpcpFlexuralStrengthSensitivityResponse()
            {
                DoweledDataPoints = DoweledDataPoints,
                UndoweledDataPoints = UndoweledDataPoints,
                Increment = increment
            };
        }

        public static object PlotOverlaySlabsCrackedSensitivity(OverlaySlabsCrackedSensitivityRequest request)
        {
            const double SlabsCrackedStartRange = 0.01;
            const double SlabsCrackedEndRange = 50.0;

            int increment = 5;
            if (!(request.Increment == null || request.Increment == 0))
            {
                increment = request.Increment.Value;
            }

            int arrayLength = (int)((SlabsCrackedEndRange - SlabsCrackedStartRange) / increment) + 1;
            SlabsCrackedSensitivity[] doweledDataPoints = new SlabsCrackedSensitivity[arrayLength];
            SlabsCrackedSensitivity[] undoweledDataPoints = new SlabsCrackedSensitivity[arrayLength];

            for (double indx = 0, step = SlabsCrackedStartRange; step <= SlabsCrackedEndRange; indx += 1, step += increment)
            {
                request.PercentSlabsCracked = step;
                var resp = CalculateOverlayThickness(request);

                if (request.IsBonded)
                {
                    RccThicknessResponse _resp = (RccThicknessResponse)resp;

                    undoweledDataPoints[(int)indx] = new SlabsCrackedSensitivity();
                    undoweledDataPoints[(int)indx].SlabsCracked = (int)step;
                    undoweledDataPoints[(int)indx].Thickness = Convert.ToDouble(_resp.UndoweledThickness.ThicknessDesign);
                }
                else
                {
                    JpcpThicknessResponse _resp = (JpcpThicknessResponse)resp;

                    doweledDataPoints[(int)indx] = new SlabsCrackedSensitivity();
                    doweledDataPoints[(int)indx].SlabsCracked = (int)step;
                    doweledDataPoints[(int)indx].Thickness = Convert.ToDouble(_resp.DoweledThickness.ThicknessDesign);

                    undoweledDataPoints[(int)indx] = new SlabsCrackedSensitivity();
                    undoweledDataPoints[(int)indx].SlabsCracked = (int)step;
                    undoweledDataPoints[(int)indx].Thickness = Convert.ToDouble(_resp.UndoweledThickness.ThicknessDesign);
                }
            }
            if (request.IsBonded)
            {
                return new RccSlabsCrackedSensitivityResponse()
                {
                    UndoweledDataPoints = undoweledDataPoints,
                    Increment = increment
                };

            }
            return new JpcpSlabsCrackedSensitivityResponse()
            {
                DoweledDataPoints = doweledDataPoints,
                UndoweledDataPoints = undoweledDataPoints,
                Increment = increment
            };
        }

        public static object PlotOverlayKValueSensitivity(OverlayKValueSensitivityRequest request)
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

            if (!(request.Increment == null || request.Increment == 0))
            {
                increment = request.Increment.Value;
            }

            int arrayLength = ((KValueEndRange - KValueStartRange) / increment) + 1;
            KValueSensitivity[] DoweledDataPoints = new KValueSensitivity[arrayLength];
            KValueSensitivity[] UndoweledDataPoints = new KValueSensitivity[arrayLength];

            for (int indx = 0, step = KValueStartRange; step <= KValueEndRange; indx += 1, step += increment)
            {
                request.CompositeKValueOfSubstructure = step;
                var resp = CalculateOverlayThickness(request);

                if (request.IsBonded)
                {
                    RccThicknessResponse _resp = (RccThicknessResponse)resp;
                    UndoweledDataPoints[indx] = new KValueSensitivity();
                    UndoweledDataPoints[indx].KValue = step;
                    UndoweledDataPoints[indx].Thickness = Convert.ToDouble(_resp.UndoweledThickness.DesignThickness);
                }
                else
                {
                    JpcpThicknessResponse _resp = (JpcpThicknessResponse)resp;
                    DoweledDataPoints[indx] = new KValueSensitivity();
                    DoweledDataPoints[indx].KValue = step;
                    DoweledDataPoints[indx].Thickness = Convert.ToDouble(_resp.DoweledThickness.DesignThickness);

                    UndoweledDataPoints[indx] = new KValueSensitivity();
                    UndoweledDataPoints[indx].KValue = step;
                    UndoweledDataPoints[indx].Thickness = Convert.ToDouble(_resp.UndoweledThickness.DesignThickness);
                }
            }
            if (request.IsBonded)
            {
                return new RccKValueSensitivityResponse()
                {
                    UndoweledDataPoints = UndoweledDataPoints,
                    Increment = increment
                };
            }
            return new JpcpKValueSensitivityResponse()
            {
                DoweledDataPoints = DoweledDataPoints,
                UndoweledDataPoints = UndoweledDataPoints,
                Increment = increment
            };
        }

        public static object PlotOverlayReliabilitySensitivity(OverlayReliabilitySensitivityRequest request)
        {
            const int ReliabilityStartRange = 50;
            const int ReliabilityEndRange = 100;

            int increment = 5;
            if (!(request.Increment == null || request.Increment == 0))
            {
                increment = request.Increment.Value;
            }

            int arrayLength = ((ReliabilityEndRange - ReliabilityStartRange) / increment) + 1;
            ReliabilitySensitivity[] DoweledDataPoints = new ReliabilitySensitivity[arrayLength];
            ReliabilitySensitivity[] UndoweledDataPoints = new ReliabilitySensitivity[arrayLength];

            for (int indx = 0, step = ReliabilityStartRange; step <= ReliabilityEndRange; indx += 1, step += increment)
            {
                request.Reliability = (step == 100 ? 99.99 : step);
                var resp = CalculateOverlayThickness(request);

                if (request.IsBonded)
                {
                    RccThicknessResponse _resp = (RccThicknessResponse)resp;

                    UndoweledDataPoints[indx] = new ReliabilitySensitivity();
                    UndoweledDataPoints[indx].Reliability = (step == 100 ? 99.99 : step);
                    UndoweledDataPoints[indx].Thickness = Convert.ToDouble(_resp.UndoweledThickness.DesignThickness);
                }
                else
                {
                    JpcpThicknessResponse _resp = (JpcpThicknessResponse)resp;

                    DoweledDataPoints[indx] = new ReliabilitySensitivity();
                    DoweledDataPoints[indx].Reliability = (step == 100 ? 99.99 : step);
                    DoweledDataPoints[indx].Thickness = Convert.ToDouble(_resp.DoweledThickness.DesignThickness);

                    UndoweledDataPoints[indx] = new ReliabilitySensitivity();
                    UndoweledDataPoints[indx].Reliability = (step == 100 ? 99.99 : step);
                    UndoweledDataPoints[indx].Thickness = Convert.ToDouble(_resp.UndoweledThickness.DesignThickness);
                }
            }
            if (request.IsBonded)
            {
                return new RccReliabilitySensitivityResponse()
                {
                    UndoweledDataPoints = UndoweledDataPoints,
                    Increment = increment
                };
            }
            return new JpcpReliabilitySensitivityResponse()
            {
                DoweledDataPoints = DoweledDataPoints,
                UndoweledDataPoints = UndoweledDataPoints,
                Increment = increment
            };
        }

        public static object PlotOverlayDesignLifeSensitivity(OverlayDesignLifeSensitivityRequest request)
        {
            const int DesignLifeStartRange = 5;
            const int DesignLifeEndRange = 75;

            int increment = 5;
            if (!(request.Increment == null || request.Increment == 0))
            {
                increment = request.Increment.Value;
            }

            int arrayLength = ((DesignLifeEndRange - DesignLifeStartRange) / increment) + 1;
            DesignLifeSensitivity[] DoweledDataPoints = new DesignLifeSensitivity[arrayLength];
            DesignLifeSensitivity[] UndoweledDataPoints = new DesignLifeSensitivity[arrayLength];

            for (int indx = 0, step = DesignLifeStartRange; step <= DesignLifeEndRange; indx += 1, step += increment)
            {
                TrafficTruckRequest truckTrafficRequest = new TrafficTruckRequest()
                {
                    TrucksPerDay = request.TrucksPerDay,
                    TrafficGrowthRate = request.TrafficGrowthRate,
                    DesignLife = step,
                    DirectionalDistribution = request.DirectionalDistribution,
                    DesignLaneDistribution = request.DesignLaneDistribution
                };
                TrafficTruckResponse truckTrafficResponse = TruckCalculatorService.CalculateTruckTraffic(truckTrafficRequest);
                request.TotalTrucksInDesignLaneOverDesignLife = truckTrafficResponse.TotalTrucks;

                var resp = CalculateOverlayThickness(request);

                if (request.IsBonded)
                {
                    RccThicknessResponse _resp = (RccThicknessResponse)resp;

                    UndoweledDataPoints[indx] = new DesignLifeSensitivity();
                    UndoweledDataPoints[indx].DesignLife = step;
                    UndoweledDataPoints[indx].Thickness = Convert.ToDouble(_resp.UndoweledThickness.DesignThickness);
                }
                else
                {
                    JpcpThicknessResponse _resp = (JpcpThicknessResponse)resp;

                    DoweledDataPoints[indx] = new DesignLifeSensitivity();
                    DoweledDataPoints[indx].DesignLife = step;
                    DoweledDataPoints[indx].Thickness = Convert.ToDouble(_resp.DoweledThickness.DesignThickness);

                    UndoweledDataPoints[indx] = new DesignLifeSensitivity();
                    UndoweledDataPoints[indx].DesignLife = step;
                    UndoweledDataPoints[indx].Thickness = Convert.ToDouble(_resp.UndoweledThickness.DesignThickness);
                }
            }
            if (request.IsBonded)
            {
                return new RccDesignLifeSensitivityResponse()
                {
                    UndoweledDataPoints = UndoweledDataPoints,
                    Increment = increment
                };
            }
            return new JpcpDesignLifeSensitivityResponse()
            {
                DoweledDataPoints = DoweledDataPoints,
                UndoweledDataPoints = UndoweledDataPoints,
                Increment = increment
            };
        }

        public static object CalculateOverlayThickness(OverlayThicknessRequest request)
        {
            object response;
            double ConvertMM = request.ConvertToMetric ? 25.4 : 1.0;

            if (request.IsBonded)
            {
                var _response = RccCalculatorService.CalculateRccThickness(request);
                double effectiveThickness = request.EffectiveThickness / ConvertMM;
                _response.UndoweledThickness.MinimumRequiredThickness = _response.UndoweledThickness.MinimumRequiredThickness / ConvertMM;

                if (effectiveThickness > _response.UndoweledThickness.MinimumRequiredThickness)
                {
                    _response.UndoweledThickness.MinimumRequiredThickness = 0;
                }
                else
                {
                    _response.UndoweledThickness.MinimumRequiredThickness -= effectiveThickness;
                }
                if (_response.UndoweledThickness.MinimumRequiredThickness < 2)
                {
                    _response.UndoweledThickness.MinimumRequiredThickness = 2;
                }

                double roundXH = Math.Round(_response.UndoweledThickness.MinimumRequiredThickness);
                double originalthickness = _response.UndoweledThickness.MinimumRequiredThickness;
                double adjustedthickness = _response.UndoweledThickness.MinimumRequiredThickness;

                if (request.ConvertToMetric)
                {
                    adjustedthickness *= ConvertMM;
                    adjustedthickness /= 5.0;
                    adjustedthickness = Math.Round(adjustedthickness) * 5.0;
                    if ((originalthickness * ConvertMM) > (adjustedthickness * ConvertMM))
                    { /* do nothing */ }
                    else
                    {
                        adjustedthickness += 5.0;
                    }
                }
                else
                {
                    if (roundXH - adjustedthickness < 0)
                    {
                        adjustedthickness = ((roundXH + 0.5) * ConvertMM);
                    }
                    if (roundXH - adjustedthickness == 0.5)
                    {
                        adjustedthickness *= ConvertMM;
                    }
                    if (roundXH - adjustedthickness >= 0 && roundXH - adjustedthickness < 0.5)
                    {
                        adjustedthickness = (roundXH * ConvertMM);
                    }
                }
                _response.UndoweledThickness.DesignThickness = Math.Round(adjustedthickness, 2).ToString();
                _response.UndoweledThickness.MinimumRequiredThickness = _response.UndoweledThickness.MinimumRequiredThickness * ConvertMM;
//                _response.UndoweledThickness.MaximumJointSpacing = "Match to existing joints.";
                response = _response;
            }
            else
            {
                var _response = JpcpCalculatorService.CalculateJpcpThickness(request);
                double effectiveThickness = request.EffectiveThickness / ConvertMM;
                _response.DoweledThickness.MinimumRequiredThickness = _response.DoweledThickness.MinimumRequiredThickness / ConvertMM;
                _response.UndoweledThickness.MinimumRequiredThickness = _response.UndoweledThickness.MinimumRequiredThickness / ConvertMM;

                if (effectiveThickness > _response.DoweledThickness.MinimumRequiredThickness)
                {
                    _response.DoweledThickness.MinimumRequiredThickness = 0;
                }
                else
                {
                    _response.DoweledThickness.MinimumRequiredThickness =
                        Math.Sqrt(
                            Math.Pow(_response.DoweledThickness.MinimumRequiredThickness, 2.0) - Math.Pow(effectiveThickness, 2.0)
                        );
                }
                if (_response.DoweledThickness.MinimumRequiredThickness < 4)
                {
                    _response.DoweledThickness.MinimumRequiredThickness = 4;
                }

                if (effectiveThickness > _response.UndoweledThickness.MinimumRequiredThickness)
                {
                    _response.UndoweledThickness.MinimumRequiredThickness = 0;
                }
                else
                {
                    _response.UndoweledThickness.MinimumRequiredThickness =
                        Math.Sqrt(
                            Math.Pow(_response.UndoweledThickness.MinimumRequiredThickness, 2.0) - Math.Pow(effectiveThickness, 2.0)
                        );
                }
                if (_response.UndoweledThickness.MinimumRequiredThickness < 4)
                {
                    _response.UndoweledThickness.MinimumRequiredThickness = 4;
                }

                double roundXH = Math.Round(_response.DoweledThickness.MinimumRequiredThickness);
                double originalthickness = _response.DoweledThickness.MinimumRequiredThickness;
                double adjustedthickness = _response.DoweledThickness.MinimumRequiredThickness;

                if (request.ConvertToMetric)
                {
                    adjustedthickness *= ConvertMM;
                    adjustedthickness /= 5.0;
                    adjustedthickness = Math.Round(adjustedthickness) * 5.0;
                    if ((originalthickness * ConvertMM) > (adjustedthickness * ConvertMM))
                    { /* do nothing */ }
                    else
                    {
                        adjustedthickness += 5.0;
                    }
                }
                else
                {
                    if (roundXH - adjustedthickness < 0)
                    {
                        adjustedthickness = ((roundXH + 0.5) * ConvertMM);
                    }
                    if (roundXH - adjustedthickness == 0.5)
                    {
                        adjustedthickness *= ConvertMM;
                    }
                    if (roundXH - adjustedthickness >= 0 && roundXH - adjustedthickness < 0.5)
                    {
                        adjustedthickness = (roundXH * ConvertMM);
                    }
                }

                _response.DoweledThickness.DesignThickness = Math.Round(adjustedthickness, 2).ToString();

                roundXH = Math.Round(_response.UndoweledThickness.MinimumRequiredThickness);
                originalthickness = _response.UndoweledThickness.MinimumRequiredThickness;
                adjustedthickness = _response.UndoweledThickness.MinimumRequiredThickness;

                if (request.ConvertToMetric)
                {
                    adjustedthickness *= ConvertMM;
                    adjustedthickness /= 5.0;
                    adjustedthickness = Math.Round(adjustedthickness) * 5.0;
                    if ((originalthickness * ConvertMM) > (adjustedthickness * ConvertMM))
                    { /* do nothing */ }
                    else
                    {
                        adjustedthickness += 5.0;
                    }
                }
                else
                {
                    if (roundXH - adjustedthickness < 0)
                    {
                        adjustedthickness = ((roundXH + 0.5) * ConvertMM);
                    }
                    if (roundXH - adjustedthickness == 0.5)
                    {
                        adjustedthickness *= ConvertMM;
                    }
                    if (roundXH - adjustedthickness >= 0 && roundXH - adjustedthickness < 0.5)
                    {
                        adjustedthickness = (roundXH * ConvertMM);
                    }
                }
                _response.UndoweledThickness.DesignThickness = Math.Round(adjustedthickness, 2).ToString();
                _response.UndoweledThickness.MinimumRequiredThickness = _response.UndoweledThickness.MinimumRequiredThickness * ConvertMM;
                _response.DoweledThickness.MinimumRequiredThickness = _response.DoweledThickness.MinimumRequiredThickness * ConvertMM;

//                _response.DoweledThickness.MaximumJointSpacing = "Match to existing joints.";
//                _response.UndoweledThickness.MaximumJointSpacing = "Match to existing joints.";
                response = _response;
            }
            return response;
        }
    }
}
