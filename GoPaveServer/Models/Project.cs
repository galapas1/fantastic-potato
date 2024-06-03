using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace GoPaveServer.Models
{
    public class Project
    {
        public int? ID                  { get; set; }

        public int folderId             { get; set; }

        [JsonIgnore]
        public int UserID               { get; set; }

        [JsonIgnore]
        public ProjectType? Type        { get; set; }

        [JsonProperty(PropertyName = "projectType")]
        [NotMapped]
        public string ProjectTypeName {
            get {
                if(Type == null) return "";
                switch(Type) {
                    case ProjectType.STREET_CONCRETE:  return "STREET_CONCRETE";
                    case ProjectType.STREET_COMPOSITE: return "STREET_COMPOSITE";
                    case ProjectType.STREET_OVERLAY:   return "STREET_OVERLAY";
                    case ProjectType.PARKING:          return "PARKING";
                    case ProjectType.INTERMODAL:       return "INTERMODAL";
                    default: throw new ArgumentOutOfRangeException("Project Type not included in enum");
                }
            }

            set {
                switch(value) {
                    case "STREET_CONCRETE":  Type = ProjectType.STREET_CONCRETE;  break;
                    case "STREET_COMPOSITE": Type = ProjectType.STREET_COMPOSITE; break;
                    case "STREET_OVERLAY":   Type = ProjectType.STREET_OVERLAY;   break;
                    case "PARKING":          Type = ProjectType.PARKING;          break;
                    case "INTERMODAL":       Type = ProjectType.INTERMODAL;       break;
                    default: throw new ArgumentException("Valid projectType is required");
                }
            }
        }

        [JsonIgnore]
        public String UnitType { get; set; }

        [JsonProperty(PropertyName = "unitType")]
        [NotMapped]
        public string UnitTypeValid {
            get {
                if(UnitType == null) return "US";
                switch(UnitType) {
                    case "US":  return "US";
                    case "METRIC":  return "METRIC";
                    default: throw new ArgumentOutOfRangeException("Unit type not valid");
                }
            }

            set {
                switch(value) {
                    case "US":  UnitType = "US"; break;
                    case "METRIC":  UnitType = "METRIC"; break;
                    default: throw new ArgumentException("Valid unit type is required");
                }
            }
        }

        [JsonProperty(Required = Required.Always)]
        public string Name              { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Description       { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Route             { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Designer          { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ZipCode           { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string OwnersAgency      { get; set; }

        public DateTime DateCreated     { get; set; }
        public DateTime LastModified    { get; set; }

        [JsonProperty(Required = Required.Always)]
        public string Body              { get; set; }
    }
}
