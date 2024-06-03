using System;
using Newtonsoft.Json;

namespace GoPaveServer.Models
{
    public class TrafficSummary
    {
        public double    AxleLoad     { get; set; }
        public double AxlesPer1000 { get; set; }
    }

    public class TrafficSummaryDetails
    {
        public TrafficSummary[] SingleAxleItems { get; set; }
        public TrafficSummary[] TandemAxleItems { get; set; }
        public TrafficSummary[] TridemAxleItems { get; set; }
    }

    public class SubbaseLayerDetails
    {
        public string LayerTypeName       { get; set; }
        public double ModulusOfElasticity { get; set; }
        public double LayerThickness      { get; set; }
        public double PoissonsRatio       { get; set; }
        public double ModulusOfRupture    { get; set; }
    }

    public class CompositeAsphaltRequest
    {
        public TrafficSummaryDetails TrafficSummaryDetails;

        public double DesignLife                      { get; set; }
        public string SurfaceLayerTypeName            { get; set; }
        public double SurfaceLayerPoissonsRatio       { get; set; }
        public double SurfaceLayerModulusOfElasticity { get; set; }
        public double AllowableDamagePerLayer         { get; set; }
        public double SurfaceLayerThickness           { get; set; }

        public double ThicknessToRigidFoundation      { get; set; }
        public double SubgradePoissonsRatio           { get; set; }
        public double SubgradeModulusOfElasticity     { get; set; }

        [JsonIgnore]
        public int NumberSubLayers {
            get {
                if(null == this.SubbaseLayerDetails)
                {
                    return 0;
                }
                return this.SubbaseLayerDetails.Length;
            }
        }

        public SubbaseLayerDetails[] SubbaseLayerDetails    { get; set; }
        //public double TotalTrucksInDesignLaneOverDesignLife { get; set; }
        public double AverageTrucksPerDayInDesignLaneOverDesignLife { get; set; }

        public void Validate()
        {
            if(string.IsNullOrEmpty(SurfaceLayerTypeName))
            {
                throw new ArgumentException("missing Surface Layer Type Name");
            }
            if(!(SurfaceLayerTypeName.StartsWith("HMA") ||
                SurfaceLayerTypeName.StartsWith("Other") ||
                 SurfaceLayerTypeName.StartsWith("BST")))
            {
                // Andy, right now I only have 'forWhat' mappings for
                //       these two surface types
                throw new ArgumentException("Surface Layer '" + SurfaceLayerTypeName +"' not supported at this time");
            }
        }
    }
}
