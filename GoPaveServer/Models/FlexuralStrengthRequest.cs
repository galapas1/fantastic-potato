namespace GoPaveServer.Models
{
    public class FlexuralStrengthRequest
    {
        public double       FlexStrength28Day    { get; set; }
        public double       CompressiveStrength  { get; set; }
        public double       ModulusOfElasticity  { get; set; }
        public double       SplitTensileStrength { get; set; }
        public StrengthType StrengthType         { get; set; }
        public bool         ConvertToMetric      { get; set; }
    }
}
