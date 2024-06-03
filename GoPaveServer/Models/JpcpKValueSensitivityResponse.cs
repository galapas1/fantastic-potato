namespace GoPaveServer.Models
{
    public class JpcpKValueSensitivityResponse
    {
        public KValueSensitivity[] UndoweledDataPoints { get; set; }
        public KValueSensitivity[] DoweledDataPoints   { get; set; }

        public int Increment  { get; set; }
    }
}
