namespace GoPaveServer.Models
{
    public class JpcpFlexuralStrengthSensitivityResponse
    {
        public FlexuralStrengthSensitivity[] DoweledDataPoints { get; set; }
        public FlexuralStrengthSensitivity[] UndoweledDataPoints { get; set; }

        public double Increment  { get; set; }
    }
}
