using Newtonsoft.Json;
using System;
using System.Linq;

namespace GoPaveServer.Models
{
    public class ThicknessRequest
    {
        public bool ConvertToMetric { get; set; }
        public bool IsMacroFibers   { get; set; }

        public double Reliability                           { get; set; }
        public double PercentSlabsCracked                   { get; set; }
        public double TotalTrucksInDesignLaneOverDesignLife { get; set; }
        public double CompositeKValueOfSubstructure         { get; set; }
        public double FlexuralStrength                      { get; set; }
        public double ResidualStrength                      { get; set; }
        public double ModulusOfElasticity                   { get; set; }

        private double[] _singleAxleWeight;
        public double[] SingleAxleWeight {
            get {
                return _singleAxleWeight;
            }
            set {
                _singleAxleWeight = resizeArray(value);
            }
        }

        public double getSingleAxleWeight(int indx) {
            if(indx < _singleAxleWeight.Length)
                return _singleAxleWeight[indx];
            return 0;
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

        public double getTandemAxleWeight(int indx) {
            if(indx < _tandemAxleWeight.Length)
                return _tandemAxleWeight[indx];
            return 0;
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

        public double getTridemAxleWeight(int indx) {
            if(indx < _tridemAxleWeight.Length)
                return _tridemAxleWeight[indx];
            return 0;
        }

        public double[] SingleAxlesPer1000 { get; set; }

        public double getSingleAxlesPer1000(int indx) {
            if(indx < SingleAxlesPer1000.Length)
                return SingleAxlesPer1000[indx];
            return 0;
        }

        public double[] TandemAxlesPer1000 { get; set; }

        public double getTandemAxlesPer1000(int indx) {
            if(indx < TandemAxlesPer1000.Length)
                return TandemAxlesPer1000[indx];
            return 0;
        }

        public double[] TridemAxlesPer1000 { get; set; }

        public double getTridemAxlesPer1000(int indx) {
            if(indx < TridemAxlesPer1000.Length)
                return TridemAxlesPer1000[indx];
            return 0;
        }

        public bool EdgeSupport                             { get; set; }

        [JsonIgnore]
        public bool DoweledPavement                         { get; set; }

        [JsonIgnore]
        public int PavementType                         { get; set; }
        //1=JPCP, 2=Parking

        public void Validate()
        {
            /*
            if(SingleAxleWeight.Length != SingleAxlesPer1000.Length ||
               TandemAxleWeight.Length != TandemAxlesPer1000.Length ||
               TridemAxleWeight.Length != TridemAxlesPer1000.Length)
               {
                   throw new ArgumentException("data array lengths do not match");
               }
            */
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

        private double[] resizeArray(double[] array)
        {
            int indx = Array.FindLastIndex(array, x => x != 0);
            Array.Resize(ref array, indx + 1);
            return array;
        }
    }
}
