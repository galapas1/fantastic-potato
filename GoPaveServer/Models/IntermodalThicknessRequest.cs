using Newtonsoft.Json;
using System;

namespace GoPaveServer.Models
{
    public class IntermodalThicknessRequest
    {
        public bool ConvertToMetric { get; set; }

        public double ModulusOfElasticity           { get; set; }
        public double CompositeKValueOfSubstructure { get; set; }
        public double FlexuralStrength              { get; set; }

        [JsonIgnore]
        public int NumberOfVehicles {
            get {
                return Vehicles == null ? 0 : Vehicles.Length;
            }
        }

        public IntermodalVehicle[] Vehicles { get; set; }

        public void Validate()
        {
            if(NumberOfVehicles < 1)
            {
                throw new ArgumentException("at least one vehicle must be specified");
            }
        }
    }
}
