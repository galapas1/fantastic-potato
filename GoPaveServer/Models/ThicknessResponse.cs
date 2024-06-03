using Newtonsoft.Json;

namespace GoPaveServer.Models
{
    public class ThicknessResponse
    {
        public ThicknessResponse()
        {
            SingleRepetitions             = new double[10];
            TandemRepetitions             = new double[10];
            TridemRepetitions             = new double[10];

            SingleAxleWeight              = new string[10] { "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" };
            TandemAxleWeight              = new string[10] { "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" };
            TridemAxleWeight              = new string[10] { "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" };

            SingleAxlesPer1000            = new string[10] { "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" };
            TandemAxlesPer1000            = new string[10] { "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" };
            TridemAxlesPer1000            = new string[10] { "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" };

            SingleAxleExpectedRepetitions = new string[10] { "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" };
            TandemAxleExpectedRepetitions = new string[10] { "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" };
            TridemAxleExpectedRepetitions = new string[10] { "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" };

            SingleStressRatio             = new string[10] { "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" };
            TandemStressRatio             = new string[10] { "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" };
            TridemStressRatio             = new string[10] { "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" };

            SingleAllowableRepetionsLow   = new string[10] { "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" };
            TandemAllowableRepetionsLow   = new string[10] { "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" };
            TridemAllowableRepetionsLow   = new string[10] { "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" };

            SingleFatigueConsumed         = new string[10] { "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" };
            TandemFatigueConsumed         = new string[10] { "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" };
            TridemFatigueConsumed         = new string[10] { "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" };

            SinglePower                   = new string[10] { "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" };
            TandemPower                   = new string[10] { "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" };
            TridemPower                   = new string[10] { "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" };

            SingleDamage                  = new string[10] { "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" };
            TandemDamage                  = new string[10] { "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" };
            TridemDamage                  = new string[10] { "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" };

            SingleAllowableRepetions      = new string[10] { "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" };
            TandemAllowableRepetions      = new string[10] { "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" };
            TridemAllowableRepetions      = new string[10] { "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" };
        }

        [JsonIgnore]
        public double ThicknessDesign                 { get; set; }

        [JsonIgnore]
        public double[] SingleRepetitions             { get; set; }
        [JsonIgnore]
        public double[] TandemRepetitions             { get; set; }
        [JsonIgnore]
        public double[] TridemRepetitions             { get; set; }

        public string TotalErosionUsed                { get; set; }
        public string TotalFatigue                    { get; set; }
        
        public string Testkvalue                      { get; set; } 
        public string TestModulusOfElasticity         { get; set; } 
        public string TestFlexuralStrength            { get; set; } 

        [JsonIgnore]
        public double MinimumRequiredThickness        { get; set; }

        [JsonProperty("minimumRequiredThickness")]
        public string MinimumRequiredThicknessStr {
            get {
                return MinimumRequiredThickness.ToString("#0.00");
            }
        }

        public string DesignThickness                 { get; set; }
        public string MaximumJointSpacing             { get; set; }

        public string[] SingleAxleWeight              { get; set; }
        public string[] TandemAxleWeight              { get; set; }
        public string[] TridemAxleWeight              { get; set; }

        public string[] SingleAxlesPer1000            { get; set; }
        public string[] TandemAxlesPer1000            { get; set; }
        public string[] TridemAxlesPer1000            { get; set; }

        public string[] SingleAxleExpectedRepetitions { get; set; }
        public string[] TandemAxleExpectedRepetitions { get; set; }
        public string[] TridemAxleExpectedRepetitions { get; set; }

        public string[] SingleStressRatio             { get; set; }
        public string[] TandemStressRatio             { get; set; }
        public string[] TridemStressRatio             { get; set; }

        public string[] SingleDamage                  { get; set; }
        public string[] TandemDamage                  { get; set; }
        public string[] TridemDamage                  { get; set; }

        public string[] SingleAllowableRepetionsLow   { get; set; }
        public string[] TandemAllowableRepetionsLow   { get; set; }
        public string[] TridemAllowableRepetionsLow   { get; set; }

        public string[] SingleAllowableRepetions      { get; set; }
        public string[] TandemAllowableRepetions      { get; set; }
        public string[] TridemAllowableRepetions      { get; set; }

        public string[] SingleFatigueConsumed         { get; set; }
        public string[] TandemFatigueConsumed         { get; set; }
        public string[] TridemFatigueConsumed         { get; set; }

        public string[] SinglePower                   { get; set; }
        public string[] TandemPower                   { get; set; }
        public string[] TridemPower                   { get; set; }
    }
}
