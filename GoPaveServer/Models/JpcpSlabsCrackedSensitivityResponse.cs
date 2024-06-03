namespace GoPaveServer.Models
{
    public class JpcpSlabsCrackedSensitivityResponse
    {
        public  SlabsCrackedSensitivity[] DoweledDataPoints   { get; set; }
        public  SlabsCrackedSensitivity[] UndoweledDataPoints { get; set; }

        public int                        Increment           { get; set; }
    }
}
