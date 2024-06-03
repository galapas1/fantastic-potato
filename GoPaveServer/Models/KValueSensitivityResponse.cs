namespace GoPaveServer.Models
{
    public class KValueSensitivityResponse
    {
        public KValueSensitivity[] DataPoints { get; set; }

        public int                 Increment  { get; set; }
    }
}
