using Newtonsoft.Json;

namespace GoPaveServer.Models
{
    public class JpcpDesignLifeSensitivityResponse
    {
        public DesignLifeSensitivity[] DoweledDataPoints { get; set; }
        public DesignLifeSensitivity[] UndoweledDataPoints { get; set; }

        [JsonProperty(PropertyName = "undoweledReferencePoint",
                      NullValueHandling = NullValueHandling.Ignore)]
        public DesignLifeSensitivity UndoweledReferencePoint { get; set; }

        public int        Increment               { get; set; }
    }
}
