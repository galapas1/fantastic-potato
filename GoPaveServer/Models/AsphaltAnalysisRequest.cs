using System;
using System.Linq;

namespace GoPaveServer.Models
{
    public class AsphaltAnalysisRequest
    {
        public int[] StructuralMaterialNumber { get; set; }

        public double DesignLife { get; set; }

        private double[] _singleAxleWeight;
        public double[] SingleAxleWeight {
            get {
                return _singleAxleWeight;
            }
            set {
                _singleAxleWeight = resizeArray(value);
            }
        }

        private double[] _tandemAxleWeight;
        public double[] TandemAxleWeight {
            get {
                return _tandemAxleWeight;
            }
            set {
                _tandemAxleWeight = resizeArray(value);
            }
        }

        private double[] _tridemAxleWeight;
        public double[] TridemAxleWeight {
            get {
                return _tridemAxleWeight;
            }
            set {
                _tridemAxleWeight = resizeArray(value);
            }
        }

        public double[] SingleAxlesPer1000 { get; set; }
        public double[] TandemAxlesPer1000 { get; set; }
        public double[] TridemAxlesPer1000 { get; set; }

        public double[] LayerCoefficient    { get; set; }
        public double[] DrainageCoefficient { get; set; }
        public double[] LayerThickness      { get; set; }

        public double   TerminalServiceability              { get; set; }
        public double   InitialServiceability               { get; set; }

        public double   Reliability                         { get; set; }
        public double   SubgradeResilientModulus            { get; set; }
        public double   OverallStandardDeviation            { get; set; }

        public bool     ConvertToMetric                     { get; set; }

        public void Validate()
        {
            /*
            if(LayerCoefficient.Length    != DrainageCoefficient.Length ||
               DrainageCoefficient.Length != LayerThickness.Length      ||
               SingleAxleWeight.Length    != SingleAxlesPer1000.Length  ||
               TandemAxleWeight.Length    != TandemAxlesPer1000.Length  ||
               TridemAxleWeight.Length    != TridemAxlesPer1000.Length)
               {
                   throw new ArgumentException("data array lengths do not match");
               }
            */
               if(TerminalServiceability >= InitialServiceability)
               {
                   throw new ArgumentException("TerminalServiceability >= InitialServiceability");
               }
        }

        public int NumSingleAxles()
        {
            return SingleAxleWeight == null ? 0 : SingleAxleWeight.Length;
        }

        public int NumTandemAxles()
        {
            return TandemAxleWeight == null ? 0 : TandemAxleWeight.Length;
        }

        public int NumTridemAxles()
        {
            return TridemAxleWeight == null ? 0 : TridemAxleWeight.Length;
        }
        public int NumLayerCoefficient()
        {
            return LayerCoefficient == null ? 0 : LayerCoefficient.Length;
        }

        public int NumDrainageCoefficient()
        {
            return DrainageCoefficient == null ? 0 : DrainageCoefficient.Length;
        }

        public int NumLayerThickness()
        {
            return LayerThickness == null ? 0 : LayerThickness.Length;
        }

        private double[] resizeArray(double[] array)
        {
            int indx = Array.FindLastIndex(array, x => x != 0);
            Array.Resize(ref array, indx + 1);
            return array;
        }
    }
}
