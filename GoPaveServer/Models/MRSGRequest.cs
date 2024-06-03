namespace GoPaveServer.Models
{
    public class MRSGRequest
    {
        public double CaliforniaBearingRatio { get; set; }
        public double ResistanceValue        { get; set; }
        public double MrsgValue              { get; set; }
        public MrsgType MrsgType             { get; set; }
        public bool   ConvertToMetric        { get; set; }
    }
}
