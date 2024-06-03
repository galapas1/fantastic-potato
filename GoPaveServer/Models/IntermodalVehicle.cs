using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace GoPaveServer.Models
{
    public enum GearTypes {
        Zero,
        Single,
        Dual,
        Tri,
        Quad
    };

    public class IntermodalVehicle
    {
        public IntermodalVehicle()
        {
            xAxleCoords = new double[16];
            yAxleCoords = new double[16];
        }

        public int? ID     { get; set; }

        [JsonIgnore]
        public int       UserID            { get; set; }
        public string    Name              { get; set; }
        public int       NumberOfWheels    { get; set; }
        public double    ContactArea       { get; set; }
        public double    ContactPressure   { get; set; }
        public double    GrossWeight       { get; set; }
        public GearTypes GearConfiguration { get; set; }

        public string    UnitType          { get; set; }

        [NotMapped]
        public double[]  xAxleCoords       { get; set; }
        [NotMapped]
        public double[]  yAxleCoords       { get; set; }

        [JsonIgnore]
        public string    XAxleCoords  {
            get {
                return (xAxleCoords == null) ? "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0" :
                    (xAxleCoords.Length == 0) ? string.Empty :
                        xAxleCoords.Skip(1).Aggregate(new StringBuilder(xAxleCoords[0].ToString()),
                                                        (s, i) => s.Append(",").Append(i), s => s.ToString());
            }
            set
            {
                if(string.IsNullOrEmpty(value))
                {
                    xAxleCoords = new double[16];
                }
                else
                {
                    xAxleCoords = value.Split(',')
                                       .Select<string, double?>(TryParseDouble)
                                       .Where(x => x.HasValue)
                                       .Select(x => x.Value).ToArray();
                }
            }
        }

        [JsonIgnore]
        public string   YAxleCoords  {
            get {
                return (yAxleCoords == null) ? "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0" :
                    (yAxleCoords.Length == 0) ? string.Empty :
                        yAxleCoords.Skip(1).Aggregate(new StringBuilder(yAxleCoords[0].ToString()),
                                                        (s, i) => s.Append(",").Append(i), s => s.ToString());
            }
            set
            {
                if(string.IsNullOrEmpty(value))
                {
                    yAxleCoords = new double[16];
                }
                else
                {
                    yAxleCoords = value.Split(',')
                                       .Select<string, double?>(TryParseDouble)
                                       .Where(x => x.HasValue)
                                       .Select(x => x.Value).ToArray();
                }
            }
        }

        public bool      CanEdit           { get; set; }

        private double? TryParseDouble(string text)
        {
            double value;
            return double.TryParse(text, out value) ? value : (double?)null;
        }
    }
}
