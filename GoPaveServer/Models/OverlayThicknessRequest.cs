using Newtonsoft.Json;
using System;
using System.Linq;

namespace GoPaveServer.Models
{
    public class OverlayThicknessRequest : ThicknessRequest
    {
        public bool   IsBonded           { get; set; }
        public double EffectiveThickness { get; set; }
    }
}
