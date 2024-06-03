using Newtonsoft.Json;

namespace GoPaveServer.Models
{
    public class ParkingReliabilitySensitivityResponse
    {
        public  ReliabilitySensitivity[] UndoweledDataPoints { get; set; }

        [JsonProperty(PropertyName = "undoweledReferencePoint",
                      NullValueHandling = NullValueHandling.Ignore)]
        public ReliabilitySensitivity UndoweledReferencePoint { get; set; }


        public int Increment { get; set; }
    }
}
