namespace GoPaveServer.Models
{
    public class MrsgUpdateWithCompositeKValueRequest
    {
        public double CaliforniaBearingRatio { get; set; }
        public double ResistanceValue        { get; set; }
        public double MrsgValue              { get; set; }
        public MrsgType MrsgType             { get; set; }

        public int      NumberOfSubLayers   { get; set; }
        public double[] LayerThickness      { get; set; }
        public double[] ModulusOfElasticity { get; set; }

        public bool   ConvertToMetric        { get; set; }
    }
}
