using System;

namespace GoPaveServer.Utils
{
    public class Calculators {
        public static double calculateFractionalESAL(int    logFactor,
                                                     double structuralNumberInInches,
                                                     double terminalServiceability,
                                                     double axleWeight,
                                                     double numAxles,
                                                     double flexibleEsal)
        {
            double gt = Math.Log10((4.2 - terminalServiceability) / 2.7);
            double beta18 = 0.4 + 1093.6016 / Math.Pow((structuralNumberInInches + 1), 5.19);
            double betax = 0.4 + 0.081 * Math.Pow((axleWeight + logFactor), 3.23) /
            (
                Math.Pow((structuralNumberInInches + 1), 5.19) * Math.Pow(logFactor, 3.23)
            );

            double equiv = 4.79 * Math.Log10(19) - 4.79 *
                Math.Log10(axleWeight + logFactor) + 4.33 *
                Math.Log10(logFactor) + gt / betax - gt / beta18;

            return Math.Pow(10, -equiv) * numAxles;
        }

        public static double calculateRigidESAL(int    logFactor,
                                                double serviceability,
                                                double thicknessDesign,
                                                double axleWeight,
                                                int    numAxles)
        {
            if(0 == axleWeight || 0 == numAxles) return 0.0;

            double gt = Math.Log10(0.333 * (4.5 - serviceability));
            double beta18 = 1+3.63*Math.Pow(19, 5.2) / Math.Pow((thicknessDesign + 1), 8.46);
            double betax  = 1+3.63*Math.Pow((axleWeight + logFactor), 5.2) /
                            (
                                Math.Pow((thicknessDesign + 1),8.46)* Math.Pow(logFactor, 3.52)
                            );
            double equiv = 4.62 * Math.Log10(19) - 4.62 *
                           Math.Log10(axleWeight + logFactor) + 3.28 *
                           Math.Log10(logFactor) + gt / betax - gt / beta18;
            return Math.Pow(10, -equiv) * numAxles;
        }

        public static double subbaseLayerKValue(double layerThickness, double modulusOfElasticity, double kValue)
        {
            kValue =
                Math.Exp(
                    -2.807 + 0.1253 *
                    Math.Pow(Math.Log(layerThickness), 2) + 1.062 *
                        Math.Log(kValue) + 0.1282 *
                        Math.Log(layerThickness) *
                        Math.Log(modulusOfElasticity) - 0.4144 *
                        Math.Log(layerThickness) - 0.0581 *
                        Math.Log(modulusOfElasticity) - 0.1317 *
                        Math.Log(layerThickness) *
                        Math.Log(kValue));
            return kValue;
        }

        public static void getNormalDeviateDeterminationBasedOnReliability(double reliability,
                                                                           out double rel1, out double rel2,
                                                                           out double z1,   out double z2)
        {
            rel1 = rel2 = z1 = z2 = 0;

            if (reliability != 0)
            {
                if (reliability < 60)
                {
                    rel1 = 50; z1 = 0; rel2 = 60; z2 = -0.253;
                }
                else if (reliability < 70)
                {
                    rel1 = 60; z1 = -0.253; rel2 = 70; z2 = -0.524;
                }
                else if (reliability < 75)
                {
                    rel1 = 70; z1 = -0.524; rel2 = 75; z2 = -0.674;
                }
                else if (reliability < 80)
                {
                    rel1 = 75; z1 = -0.674; rel2 = 80; z2 = -0.841;
                }
                else if (reliability < 85)
                {
                    rel1 = 80; z1 = -0.841; rel2 = 85; z2 = -1.037;
                }
                else if (reliability < 90)
                {
                    rel1 = 85; z1 = -1.037; rel2 = 90; z2 = -1.282;
                }
                else if (reliability < 91)
                {
                    rel1 = 90; z1 = -1.282; rel2 = 91; z2 = -1.34;
                }
                else if (reliability < 92)
                {
                    rel1 = 91; z1 = -1.34; rel2 = 92; z2 = -1.405;
                }
                else if (reliability < 93)
                {
                    rel1 = 92; z1 = -1.405; rel2 = 93; z2 = -1.476;
                }
                else if (reliability < 94)
                {
                    rel1 = 93; z1 = -1.476; rel2 = 94; z2 = -1.555;
                }
                else if (reliability < 95)
                {
                    rel1 = 94; z1 = -1.555; rel2 = 95; z2 = -1.645;
                }
                else if (reliability < 96)
                {
                    rel1 = 95; z1 = -1.645; rel2 = 96; z2 = -1.751;
                }
                else if (reliability < 97)
                {
                    rel1 = 96; z1 = -1.751; rel2 = 97; z2 = -1.881;
                }
                else if (reliability < 98)
                {
                    rel1 = 97; z1 = -1.881; rel2 = 98; z2 = -2.054;
                }
                else if (reliability < 99)
                {
                    rel1 = 98; z1 = -2.054; rel2 = 99; z2 = -2.327;
                }
                else if (reliability < 100)
                {
                    rel1 = 99; z1 = -2.327; rel2 = 99.99; z2 = -3.75;
                }
                else
                {
                    throw new ArgumentException("invalid Reliability value");
                }
            }
        }

        public static double calculateEQ6N(double xl)
        {
            double EQ6N;
            EQ6N = 2005.4 - 1980.9 * Math.Log10(xl) + 99.008 * xl;
            return EQ6N;
        }

        public static double calculateEQ5N(double xl)
        {

            double EQ5N;
            EQ5N = 3029 - 2966.8 * Math.Log10(xl) + 133.69 * xl - 0.0632 * Math.Pow(xl, 2.0);
            return EQ5N;
        }
        public static double calculateEQ54P(double xl)
        {

            double EQ54P;
            EQ54P = 1.7423 + 186.4 / xl - 1393.9 / Math.Pow(xl, 2) + 20789.0 / Math.Pow(xl, 3);
            return EQ54P;
        }
        public static double calculateEQ53P(double xl)
        {

            double EQ53P;
            EQ53P = 1.7423 + 186.4 / xl - 1393.9 / Math.Pow(xl, 2.0) + 20789.0 / Math.Pow(xl, 3);
            return EQ53P;
        }
        public static double calculateEQ43P(double xl)
        {

            double EQ43P;
            EQ43P = 1.258 + 97.491 / xl + 1484.1 / Math.Pow(xl, 2.0) - 180.0 / Math.Pow(xl, 3);
            return EQ43P;
        }
        public static double calculateEQ42P(double xl)
        {

            double EQ42P;
            EQ42P = 1.847 + 213.68 / xl - 1260.8 / Math.Pow(xl, 2.0) + 22989 / Math.Pow(xl, 3);
            EQ42P = 0.95 * EQ42P;
            return EQ42P;
        }
        public static double calculateEQ3N(double xl)
        {

            double EQ3N;
            EQ3N = -88.54 + 134.0 * Math.Log10(xl) + 0.83 * xl;
            return EQ3N;
        }
        public static double calculateEQ38P(double xl)
        {

            double EQ38P;
            EQ38P = 1.1014 + 124.0 / xl - 2423.6 / Math.Pow(xl, 2.0) + 26977.8 / Math.Pow(xl, 3);
            return EQ38P;
        }
        public static double calculateEQ37P(double xl)
        {

            double EQ37P;
            EQ37P = 4.0869 + 117.3 / xl + 3939.1 / Math.Pow(xl, 2.0) - 19232.7 / Math.Pow(xl, 3);
            return EQ37P;
        }
        public static double calculateEQ32P(double xl)
        {

            double EQ32P;
            EQ32P = -0.3019 + 128.85 / xl + 1105.8 / Math.Pow(xl, 2) + 3269.1 / Math.Pow(xl, 3);
            return EQ32P;
        }
        public static double calculateEQ31P(double xl)
        {

            double EQ31P;
            EQ31P = 1.571 + 46.127 / xl + 4372.7 / Math.Pow(xl, 2.0) - 22886 / Math.Pow(xl, 3);
            EQ31P = 0.95 * EQ31P;
            return EQ31P;
        }
        public static double calculateEQ2N(double xl)
        {

            double EQ2N;
            EQ2N = -970.4 + 1202.6 * Math.Log10(xl) + 53.587 * xl;
            return EQ2N;
        }
        public static double calculateEQ28P(double xl)
        {

            double EQ28P;
            EQ28P = 0.0345 + 146.25 / xl - 2385.6 / Math.Pow(xl, 2.0) + 23848 / Math.Pow(xl, 3);
            return EQ28P;
        }
        public static double calculateEQ27P(double xl)
        {

            double EQ27P;
            EQ27P = 1.47 + 102.2 / xl - 1072.0 / Math.Pow(xl, 2.0) + 14451 / Math.Pow(xl, 3);
            return EQ27P;
        }
        public static double calculateEQ1N(double xl)
        {

            double EQ1N;
            EQ1N = -1600 + 2525 * Math.Log10(xl) + 24.42 * xl + 0.204 * Math.Pow(xl, 2.0);
            return EQ1N;
        }
        public static double calculateEQ18P(double xl)
        {

            double EQ18P;
            EQ18P = 0.018 + 72.99 / xl + 323.1 / Math.Pow(xl, 2.0) + 1620.0 / Math.Pow(xl, 3);
            return EQ18P;
        }
        public static double calculateEQ7N(double xl)
        {

            double EQ7N;
            EQ7N = -414.6 + 1460.2 * Math.Log10(xl) + 18.902 * xl - 0.1243 * Math.Pow(xl, 2.0);
            return EQ7N;
        }
        public static double calculateEQ17P(double xl)
        {

            double EQ17P;
            EQ17P = 0.5874 + 65.108 / xl + 1130.9 / Math.Pow(xl, 2.0) - 5245.8 / Math.Pow(xl, 3);
            return EQ17P;
        }
        public static double calculateL(double inputxh, double inputelasticity, double inputk)
        {

            double xl;
            xl = inputelasticity * Math.Pow(inputxh, 3.0) / 11.73 / inputk;
            xl = Math.Pow(xl, 0.25);
            return xl;
        }

        public static int toInt(double val)
        {
            return Convert.ToInt32(val);
        }

        public static double limitVal(double val)
        {
            if (val > 9)
            {
                val = 15.657 - 7.6 * Math.Pow(val - 9.0, 0.103);
                return 0.89167 * val + 0.56275;
            }
            return 10;
        }

        public static void callYMX(int numWheels, double XL, double A, double B, double C, int K, double[] XY, out double YMax)
        {
            YMax = 0.0;

            switch (K)
            {
                case 1:
                    goto jmp228;

                case 2:
                case 3:
                case 6:
                    goto jmp222;

                case 4:
                case 7:
                    goto jmp223;

                case 5:
                case 8:
                    goto jmp224;
            }

        jmp223:
            if (B < A)
            {
                for (int indx = 1; indx < numWheels; indx++)
                {
                    XY[indx] = XY[indx] + XL / 10.0;
                }
                return;
            }

        jmp222:
            for (int indx = 1; indx < numWheels; indx++)
            {
                XY[indx] = XY[indx] - XL / 20.0;

            }
            return;

        jmp224:
            if (XY[1] < 0.0)
            {
                if (B <= C)
                {
                    A = B;
                    B = C;
                    K = K - 1;
                    for (int indx = 1; indx < numWheels; indx++)
                    {
                        XY[indx] = XY[indx] - XL / 20.0;
                    }
                }
                else
                {
                    YMax = XY[1] + ((A - C) / (2.0 * B - A - C) + 2.0) * 0.025 * XL;
                    double AB = XY[1];
                    for (int indx = 1; indx < numWheels; indx++)
                    {
                        XY[indx] = XY[indx] + YMax - AB;
                    }
                }
            }
            else
            {
                if (A <= C)
                {
                    for (int indx = 1; indx < numWheels; indx++)
                    {
                        XY[indx] = XY[indx] + XL / 20.0;
                    }
                    B = A;
                    A = C;
                    K = K - 1;
                }
                else
                {
                    YMax = XY[1] + ((C - B) / (2.0 * A - C - B) - 2.0) * 0.025 * XL;
                    double AB = XY[1];
                    for (int indx = 1; indx < numWheels; indx++)
                    {
                        XY[indx] = XY[indx] + YMax - AB;
                    }
                }
            }
        jmp228:
            return;
        }

        public static void callXMX(int numWheels, double XL, double A, double B, double C, int K, double[] XY, out double XMax)
        {
            XMax = 0.0;

            switch (K)
            {
                case 1:
                    goto jmp228;

                case 2:
                case 3:
                case 6:
                    goto jmp222;

                case 4:
                case 7:
                    goto jmp223;

                case 5:
                case 8:
                    goto jmp224;
            }

        jmp223:
            if (B < A)
            {
                for (int indx = 1; indx < numWheels; indx++)
                {
                    XY[indx] = XY[indx] + XL / 10.0;
                }
                return;
            }

        jmp222:
            for (int indx = 1; indx < numWheels; indx++)
            {
                XY[indx] = XY[indx] - XL / 20.0;

            }
            return;

        jmp224:
            if (XY[1] < 0.0)
            {
                if (B <= C)
                {
                    A = B;
                    B = C;
                    K = K - 1;
                    for (int indx = 1; indx < numWheels; indx++)
                    {
                        XY[indx] = XY[indx] - XL / 20.0;
                    }
                }
                else
                {
                    XMax = XY[1] + ((A - C) / (2.0 * B - A - C) + 2.0) * 0.025 * XL;
                    double AB = XY[1];
                    for (int indx = 1; indx < numWheels; indx++)
                    {
                        XY[indx] = XY[indx] + XMax - AB;
                    }
                }
            }
            else
            {
                if (A <= C)
                {
                    for (int indx = 1; indx < numWheels; indx++)
                    {
                        XY[indx] = XY[indx] + XL / 20.0;
                    }
                    B = A;
                    A = C;
                    K = K - 1;
                }
                else
                {
                    XMax = XY[1] + ((C - B) / (2.0 * A - C - B) - 2.0) * 0.025 * XL;
                    double AB = XY[1];
                    for (int indx = 1; indx < numWheels; indx++)
                    {
                        XY[indx] = XY[indx] + XMax - AB;
                    }
                }
            }
        jmp228:
            return;
        }
    }
}
