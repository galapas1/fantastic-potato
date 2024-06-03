using Newtonsoft.Json;
using System.Linq;

namespace GoPaveServer.Models
{
    public class IntermodalThicknessResponse {
        public IntermodalThicknessResponse()
        {            
            ThicknessValues = new double[16];
            MaximumAngle = new double[16];
            MaximumStress = new double[16];
            TotalRepetitions = new double[16];
            TotalRepetitionsString = new string[16];
            VehicleNames = new string[16];
        }

         [JsonProperty("DesignThickness")]
        public string DesignThicknessStr {
            get {
                return DesignThickness;
            }
        }

         [JsonProperty("ThicknessValue")]
        public string ThicknessValueStr {
            get {
                return ThicknessValues.Max().ToString("N2");
            }
        }

        [JsonProperty("MaximumJointSpacing")]
        public string MaximumJointSpacingStr {
            get {
                return MaximumJointSpacing;
            }
        }       

        [JsonProperty("StressRatio")]
        public string StressRatioStr {
            get {
                return "0.5";
            }
        }

        [JsonProperty("VehicleNamesRaw")]
        public string[] VehicleNames     { get; set; }    
        [JsonProperty("MaximumAngleRaw")]
        public double[] MaximumAngle     { get; set; }      
        [JsonProperty("MaximumStressRaw")]
        public double[] MaximumStress    { get; set; }
         [JsonProperty("TotalRepetionsRaw")]
        public double[] TotalRepetitions    { get; set; }
           [JsonProperty("TotalRepetionsRawStr")]
        public string[] TotalRepetitionsString    { get; set; }
         [JsonProperty("TotalRepetitions")]
        public string TotalRepetitionsStr {
            get {
                //return TotalRepetitions.ToString("N2");
                return "Unlimited";
            }
        }

          [JsonProperty("ThicknessValuesRaw")]
        public double[] ThicknessValues{ get; set; }

        [JsonIgnore]
        public string originalRequest;

        [JsonIgnore]
        public double YMax             { get; set; }
        [JsonIgnore]
        public double XMax             { get; set; }
        //[JsonIgnore]
        //public double TotalRepetitions { get; set; }
           
        [JsonIgnore]
        public string MaximumJointSpacing    { get; set; }
        [JsonIgnore]
        public string DesignThickness    { get; set; }

       [JsonIgnore]
        public string YMaxStr {
            get {
                return YMax.ToString("N2");
            }
        }

        [JsonIgnore]
        public string XMaxStr {
            get {
                return XMax.ToString("N2");
            }
        }       
        
        

       
       
    }
}
