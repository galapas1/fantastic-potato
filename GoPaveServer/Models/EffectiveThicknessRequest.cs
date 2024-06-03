namespace GoPaveServer.Models
{
    public class EffectiveThicknessRequest
    {
        public bool   IsBonded                      { get; set; }
        public double ExistingThickness             { get; set; }
        public double JointCrackingAdjustmentFactor { get; set; }
        public double FatigueAdjustmentFactor       { get; set; }
        public double DurabilityAdjustmentFactor    { get; set; }
    }
}
