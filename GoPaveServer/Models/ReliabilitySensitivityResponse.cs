namespace GoPaveServer.Models
{
    public class ReliabilitySensitivityResponse
    {
        public  ReliabilitySensitivity[] DataPoints { get; set; }

        public int                       Increment  { get; set; }
    }
}
