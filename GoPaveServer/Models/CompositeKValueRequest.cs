namespace GoPaveServer.Models
{
    public class CompositeKValueRequest
    {
        public double MrsgValue             { get; set; }

        public int      NumberOfSubLayers   { get; set; }
        public double[] LayerThickness      { get; set; }
        public double[] ModulusOfElasticity { get; set; }

        public bool   ConvertToMetric       { get; set; }
    }
}
