using GoPaveServer.Data;
using GoPaveServer.Models;
using GoPaveServer.Utils;
using System;
using Newtonsoft.Json;
using System.Linq;

namespace GoPaveServer.Calculators
{
    public class IntermodalThicknessCalculator
    {
        public static IntermodalThicknessResponse CalculateIntermodalThickness(IntermodalThicknessRequest request)
        {
            if(request == null)
            {
                 throw new ArgumentException("malformed request");
            }
            request.Validate();
            IntermodalThicknessResponse response = new IntermodalThicknessResponse()
            {
                originalRequest = JsonConvert.SerializeObject(request)
            };

            const double PI = 3.1415927;

            double ConvertToPSIIN  = 1;
            double ConvertToPSI    = 1;
            double ConvertCM       = 1;
            double ConvertArea     = 1;
            double ConvertPressure = 1;
            double ConvertFT       = 1.0;

            if (request.ConvertToMetric)
            {
                ConvertToPSIIN  = 3.683;
                ConvertToPSI    = 145.03;
                ConvertCM       = 2.54;
                ConvertArea     = 0.155;
                ConvertPressure = 0.145038;
                ConvertFT       = 0.3048;
            }

            int K = 1;

            double[] X = new double[16];
            double[] Y = new double[16];

            double XMax;
            double YMax;

            double[] BETA = new double[20];
            double[] XU   = new double[20];

            double[] Icode = new double[16];
            double[] Count = new double[16];
            double[] fwhl  = new double[16];

            double[] B = new double[14];
            double[] A = new double[14];

            double[,] F = new double[20,5];
            double[] E = new double[10];

            double V1 = 0.0;
            double V2 = 0.0;

            double[] ThicknessValues = new double[16];
            double[] MaximumStress = new double[16];

            double r = 0.0, lngth = 0.0;
            for (int indx = 0; indx < request.NumberOfVehicles; indx++)
            {
                response.VehicleNames[indx] = request.Vehicles[indx].Name;                
                response.ThicknessValues[indx] = 4.9;
                double ratio = 50.0;
                while (ratio >= 0.5)
                {
                    response.ThicknessValues[indx] += 0.1;

                    double contactArea     = request.Vehicles[indx].ContactArea     * ConvertArea;
                    double contactPressure = request.Vehicles[indx].ContactPressure * ConvertPressure;
                    int    numWheels       = request.Vehicles[indx].NumberOfWheels;

                    double modulusOfElasticity = request.ModulusOfElasticity           * ConvertToPSI;
                    double kValue              = request.CompositeKValueOfSubstructure * ConvertToPSIIN;
                    double flexuralStrength    = request.FlexuralStrength              * ConvertToPSI;

                    for(int wheelCnt = 0; wheelCnt < numWheels; wheelCnt++)
                    {
                        X[wheelCnt] = request.Vehicles[indx].xAxleCoords[wheelCnt] / ConvertCM;
                        Y[wheelCnt] = request.Vehicles[indx].yAxleCoords[wheelCnt] / ConvertCM;
                    }

                    double XXL = Math.Sqrt(
                        Math.Pow(response.ThicknessValues[indx], 3.0) / kValue
                    );

                    double SPCFL = 24.1652 * Math.Sqrt(XXL);
                    SPCFL = SPCFL * Math.Pow(modulusOfElasticity, 0.25) / 44.7214;

                    double alph = 0.0;
                    double XL = SPCFL;

                    double AX = 0.5 * (Math.Sqrt(contactArea / 0.5227)) / XL;
                    double BX = contactArea / (PI * AX * XL * XL);
                    double FTOT = 0.0;
                    double FACC = 0.0;
                    K = 1;
jmp15:
                    double TFWHL = 0.0;
                    for(int wheelCnt = 0; wheelCnt < numWheels; wheelCnt++)
                    {
                        double YN = Y[wheelCnt];
                        double XN = X[wheelCnt];
                        double length = Math.Pow((Math.Pow(XN, 2.0) + Math.Pow(YN, 2.0)), 0.5);

                        double zeta = 0.0;
                        if(XN == 0.0)
                        {
                            zeta = PI / 2.0;
                        }
                        else
                        {
                            zeta = Math.Atan(YN / XN);
                        }

                        if(XN < 0)
                        {
                            zeta += PI;
                        }

                        if (K < 3)
                        {
                            if (K < 2)
                            {
                                if ((Y[wheelCnt] * X[wheelCnt]) == 0.0)
                                {
                                    if (Y[wheelCnt] == 0.0)
                                    {
                                        BETA[wheelCnt] = 0.0;
                                    }
                                    else
                                    {
                                        BETA[wheelCnt] = PI / 2.0;
                                    }
                                }
                                else
                                {
                                    BETA[wheelCnt] = Math.Atan(Y[wheelCnt] / X[wheelCnt]);
                                }
                                alph = -BETA[wheelCnt];
                            }
                            else
                            {
                                alph = PI / 2.0 - BETA[wheelCnt];
                            }
                        }
                        double XHN = Math.Abs(XN / XL);
                        double XKN = Math.Abs(YN / XL);
                        double C = Math.Pow(AX * XKN, 2.0) + Math.Pow(BX * XHN, 2.0) - Math.Pow(AX * BX, 2.0);

                        if (C <= 0.0)
                        {
                            goto jmp45;
                        }

                        if(AX - Math.Abs(XHN) == 0.0)
                        {
                            goto jmp40;
                        }

                        double SLP1 = (-(XHN * XKN) - Math.Sqrt(C)) / (Math.Pow(AX, 2.0) - Math.Pow(XHN, 2.0));
                        double SLP2 = (-(XHN * XKN) + Math.Sqrt(C)) / (Math.Pow(AX, 2.0) - Math.Pow(XHN, 2.0));
                        if (SLP2 < SLP1)
                        {
                            double STOR3 = SLP2;
                            SLP2  = SLP1;
                            SLP1  = STOR3;
                        }

                        double THET2 = Math.Atan(SLP2);
                        if(XHN == 0.0)
                        {
                            goto jmp36;
                        }

                        if(SLP2 - XKN / XHN < 0)
                        {
                            goto jmp36;
                        }
jmp35:
                        if(SLP1 >= 0.0)
                        {
                            goto jmp37;
                        }
                        else
                        {
                            goto jmp38;
                        }
jmp36:
                        double THET1 = PI - Math.Atan(Math.Abs(SLP1));
                        goto jmp39;
jmp37:
                        THET1 = Math.Atan(SLP1);
                        goto jmp39;
jmp38:
                        THET1 = -Math.Atan(Math.Abs(SLP1));
jmp39:
                        double DTHET = (THET2 - THET1) / 20.0;
                        double THET = THET1 + DTHET / 2.0;
                        goto jmp48;
jmp40:
                        SLP1 = (Math.Pow(XKN, 2.0) - Math.Pow(BX, 2.0)) / (2.0 * XHN * XKN);
                        THET2 = PI / 2.0;
                        goto jmp35;

jmp45:
                        DTHET = (2.0 * PI) / 88.0;
                        THET1 = -DTHET;
                        double J = 44;
                        double S = -1.0;

                        THET = THET1 + DTHET;
                        goto jmp70;
jmp48:
                        J = 20;
                        S = 1.0;
jmp70:
                        double P1 = 0.0;
                        double P2 = 0.0;
                        for(int I = 0; I < J; I++)
                        {
                            double Costhet = Math.Cos(THET);
                            if (Costhet != 0.0)
                            {
                                double SLP = Math.Sin(THET) / Costhet;
                                double AQDRT = Math.Pow(BX, 2.0) + Math.Pow(AX * SLP, 2.0);
                                double BQDRT = -(2.0 * XHN * Math.Pow(BX, 2.0) + 2.0 * XKN * SLP * Math.Pow(AX, 2.0));
                                double CQDRT = Math.Pow(BX * XHN, 2.0) + Math.Pow(AX * XKN, 2.0) - Math.Pow(AX * BX, 2.0);
                                double DISCR = Math.Pow(BQDRT, 2.0) - 4.0 * AQDRT * CQDRT;
                                double PX1 = (-BQDRT - Math.Sqrt(DISCR)) / (2.0 * AQDRT);
                                double PX2 = (-BQDRT + Math.Sqrt(DISCR)) / (2.0 * AQDRT);
                                P1 = PX1 / Costhet;
                                P2 = PX2 / Costhet;
                            }
                            else
                            {
                                P1 = XKN - (BX / AX) * Math.Sqrt(Math.Pow(AX, 2.0) - Math.Pow(XHN, 2.0));
                                P2 = XKN + (BX / AX) * Math.Sqrt(Math.Pow(AX, 2.0) - Math.Pow(XHN, 2.0));
                            }

                            if (P2 < P1)
                            {
                                double STOR1 = P2;
                                P2 = P1;
                                P1 = STOR1;
                            }
                            double factor = 0.0;
                            if (P2 >= 3.0)
                            {
                                if (P1 >= 3.0)
                                {
                                    if (lngth < (3.1 * XL))
                                    {
                                        r = 33.4414 * Math.Pow((lngth / XL - 2.6754), 2.0) - 37.0288;
                                    }
                                    else
                                    {
                                        r = -4.0074 * Math.Pow((lngth / XL - 5.9347), 2.0);
                                    }

                                    S = 7.4144 * Math.Pow((lngth / XL - 5.7354), 2.0) + 0.04;
                                    TFWHL = (r - Math.Cos(2.0 * (zeta + alph)) * S) * contactArea / 6000.0;
                                    if ((lngth / XL) <= 3.0)
                                    {
                                        factor = 0.95;
                                    }
                                    else
                                    {
                                        factor = 3.0 * XL / lngth;
                                    }

                                    double correct = -0.235 * Math.Pow((1000.0 / contactArea), 0.18) * Math.Pow(Math.Sin(zeta + alph), 3.0) * Math.Pow(factor, 8.0) * (Math.Pow(response.ThicknessValues[indx], 2.0) / 6.0 / contactPressure);
                                    TFWHL = TFWHL + correct;
                                    if ((lngth / XL) >= 5.6)
                                    {
                                        TFWHL = 0.0;
                                    }
                                    Icode[wheelCnt] = 2;
                                    goto jmp900;
                                }
                                P2 = 3.0;
                            }
                            double FELM = 0.0;
                            if (I == J / 2.0)
                            {
                                if (P2 >= 3.0)
                                {
                                    if (lngth < (3.1 * XL))
                                    {
                                        r = 33.4414 * Math.Pow(lngth / XL - 2.6754, 2.0) - 37.0288;
                                    }
                                    else
                                    {
                                        r = -4.0074 * Math.Pow(lngth / XL - 5.9347, 2.0);
                                    }

                                    S = 7.4144 * Math.Pow(lngth / XL - 5.7354, 2.0) + 0.04;
                                    TFWHL = (r - Math.Cos(2.0 * (zeta + alph)) * S) * contactArea / 6000.0;
                                    if ((lngth / XL) <= 3.0)
                                    {
                                        factor = 0.95;
                                    }
                                    else
                                    {
                                        factor = 3.0 * XL / lngth;
                                    }

                                    double correct = -0.235 * Math.Pow((1000.0 / contactArea), 0.18) * Math.Pow(Math.Sin(zeta + alph), 3.0) * Math.Pow(factor, 8.0) * (Math.Pow(response.ThicknessValues[indx], 2.0) / 6.0 / contactPressure);
                                    TFWHL = TFWHL + correct;
                                    if ((lngth / XL) >= 5.6)
                                    {
                                        TFWHL = 0.0;
                                    }
                                    Icode[wheelCnt] = 1;
                                    goto jmp900;
                                }
                                else
                                {
                                    Icode[wheelCnt] = 0;
                                }
                            }

                            if (P1 == 0.0)
                            {
                                V1 = 0.0;
                            }
                            else
                            {
                                if (P2 == 0.0)
                                {
                                    V2 = 0.0;
                                }
                                else
                                {
                                    V2 = (2.0 / PI) * Math.Log(Math.Abs(P2 / 2.0));
                                    V1 = (2.0 / PI) * Math.Log(Math.Abs(P1 / 2.0));
                                }
                            }

                            B[2] = Math.Pow(P2 / 3.0, 2.0);
                            A[2] = Math.Pow(P1 / 3.0, 2.0);

                            for(int ka = 4; ka < 12; ka += 2)
                            {
                                B[ka] = B[ka - 2] * B[2];
                                A[ka] = A[ka - 2] * A[2];
                                if ((A[2] - A[ka]) == A[2]) A[ka] = 0;
                            }

                            for(int ka = 2; ka < 12; ka += 2)
                            {
                                A[ka] = A[ka] * S;
                            }

                            double D2    = (B[2] - A[2]) * (-0.22121);
                            double D20   = (B[2] - A[2]) * (-0.6056);
                            double DV2   = (V2 * B[2] - V1 * A[2]) * (-4.5);
                            double DV20  = (V2 * B[2] - V1 * A[2]) * 2.25;
                            double D4    = (B[4] - A[4]) * 2.53125;
                            double D40   = (B[4] - A[4]) * (-0.63281);
                            double D6    = (B[6] - A[6]) * (-1.31648);
                            double D60   = (B[6] - A[6]) * 0.253;
                            double DV6   = (V2 * B[6] - V1 * A[6]) * 1.89846;
                            double DV60  = (V2 * B[6] - V1 * A[6]) * (-0.31639);
                            double D8    = (B[8] - A[8]) * (-0.177944);
                            double D80   = (B[8] - A[8]) * 0.022224;
                            double D10   = (B[10] - A[10]) * 0.0401;
                            double D100  = (B[10] - A[10]) * (-0.00428);
                            double DV10  = -0.0399 * (V2 * B[10] - V1 * A[10]);
                            double DV100 = (V2 * B[10] - V1 * A[10]) * 0.003944;
                            double D12   = (B[12] - A[12]) * 0.001429;
                            double D120  = (B[12] - A[12]) * (-0.000105);

                            double DIFF0 = D120 + DV100 + D100 + D80 + DV60 + D60 + D40 + D20 + DV20 + 0.5 - 0.5 * S;
                            double DIFF1 = D12 + DV10 + D10 + D8 + DV6 + D6 + D4 + D2 + DV2;
                            double Y6 = Math.Sin(Math.Abs(DTHET));
                            if ((Y[wheelCnt] * X[wheelCnt]) < 0.0)
                            {
                                XU[wheelCnt] = -1.0;
                            }
                            else
                            {
                                XU[wheelCnt] = 1.0;
                            }

                            double Y7 = 2.0 * (THET + alph * XU[wheelCnt]);
                            double Y8 = Math.Cos(Y7);
                            double Y1 = Y6 * Y8;
                            FELM = Math.Pow(XL, 2.0) / 8.0 * (1.15 * Math.Abs(DTHET) * DIFF1 + 1.7 * Y1 * (DIFF1 / 2.0 + DIFF0 - 0.5 + 0.5 * S));
                            THET = THET + DTHET;
                            TFWHL = TFWHL + FELM;
                        } // for I
jmp900:
                        if (K <= 2)
                        {
                            F[wheelCnt,K] = TFWHL;
                        }
                        else
                        {
                            if (K <= 5)
                            {
                                F[wheelCnt, K-2] = TFWHL;
                            }
                        }
                        Count[wheelCnt] = TFWHL * 10000.0 / Math.Pow(XL, 2.0);
                        FACC = TFWHL + FACC;
                        if (K > 8)
                        {
                            fwhl[wheelCnt] = TFWHL;
                        }
                        TFWHL = 0.0;
                    } // for wheelCnt

                    FTOT = FTOT + FACC;
                    E[K] = FTOT;

                    double TOTCT = FTOT * 10000.0 / Math.Pow(XL, 2.0);

                    switch(K) {
                        case 1:
                            goto jmp228;
                        case 2:
                            goto jmp221;
                        case 3:
                        case 4:
                        case 5:
                            goto jmp222;
                        case 6:
                        case 7:
                        case 8:
                            goto jmp235;
                        case 9:
                            goto jmp225;
                    }
jmp221:
                    double XNMR = 0.0;
                    double DENOM = 0.0;
                    for (int wheelCnt = 0; wheelCnt < numWheels; wheelCnt++)
                    {
                        double AS1 = Math.Sin(2.0 * BETA[wheelCnt]);
                        double AC = Math.Cos(2.0 * BETA[wheelCnt]);

                        if (Math.Abs(AS1) < 0.0001) AS1 = 0.0;
                        if (Math.Abs(AC) < 0.0001) AC = 0.0;

                        XNMR = XNMR - Math.Abs(F[wheelCnt,1] - F[wheelCnt,2]) * AS1;
                        DENOM = DENOM + Math.Abs(F[wheelCnt,1] - F[wheelCnt,2]) * AC;
                    }
                    if (XNMR == 0)
                    {
                        alph = PI / 4.0 * (1.0 + Math.Sign(DENOM));
                    }
                    else
                    {
                        if (DENOM == 0)
                        {
                            alph = 0.5 * PI * (1.0 + 0.5 * Math.Sign(XNMR));
                        }
                        else
                        {
                            alph = PI / 4.0 * (1.0 + Math.Sign(DENOM)) + 0.5 * Math.Atan(XNMR / DENOM);
                        }
                    }
                    response.MaximumAngle[indx] = 180.0 * alph / PI;
                    goto jmp228;
jmp222:
                    Utils.Calculators.callYMX(numWheels, XL, E[4], E[3], E[5], K, Y, out YMax);
                    response.YMax = YMax;
                    goto jmp228;
jmp235:
                    Utils.Calculators.callXMX(numWheels, XL, E[7], E[6], E[8], K, X, out XMax);
                    response.XMax = XMax;
jmp228:
                    K = K + 1;
                    FTOT = 0.0;
                    FACC = 0.0;
                    goto jmp15;
jmp225:
                    response.MaximumStress[indx] = 6.0 * contactPressure * FTOT / Math.Pow(response.ThicknessValues[indx], 2.0);
                    if (response.MaximumAngle[indx] < 0.0) response.MaximumAngle[indx] = 180.0 + response.MaximumAngle[indx];

                    for(int wheelCnt = 0; wheelCnt < numWheels; wheelCnt++)
                    {
                        Y[wheelCnt] = Y[wheelCnt] - response.YMax;
                        X[wheelCnt] = X[wheelCnt] - response.XMax;
                    }
                    
                    ratio = response.MaximumStress[indx] / flexuralStrength;
                    response.TotalRepetitions[indx] = Math.Pow(10.0, ((0.97184 - ratio) / 0.08244));                    
                    response.TotalRepetitionsString[indx] = response.TotalRepetitions[indx].ToString("N0");

                    if (ratio >= 1.0) response.TotalRepetitions[indx] = 0.0;

                 

                } // end while

                 response.YMax = response.YMax * ConvertCM;
		         response.XMax = response.XMax * ConvertCM;		            
	             MaximumStress[indx] = response.MaximumStress[indx] / ConvertToPSI;
                 ThicknessValues[indx] = response.ThicknessValues[indx];

                   if(request.ConvertToMetric)
                    {		               
		                ThicknessValues[indx] = response.ThicknessValues[indx] * ConvertCM * 10;	                    
                    }

                    response.MaximumAngle[indx]=Math.Round(response.MaximumAngle[indx],2);
                    response.MaximumStress[indx]=Math.Round(MaximumStress[indx],2);
                    response.ThicknessValues[indx]=Math.Round(ThicknessValues[indx],2);
            } // end for num vehicles
             double xhconvertJntSpc = 0.0;
             double thicknessmax = response.ThicknessValues.Max();

             double ConvertIN = 1;
             if(request.ConvertToMetric)
                    {		               
		                ConvertIN = ConvertCM*10;	                    
                    }

                    //New calculation based on radius of relative stiffness
                    xhconvertJntSpc=(5.25*Math.Pow(((request.ModulusOfElasticity*ConvertToPSI)*Math.Pow((thicknessmax/ConvertIN),3.0)/(12*(1-Math.Pow(0.15,2.0))*(request.CompositeKValueOfSubstructure*ConvertToPSIIN))),0.25))/12;

                   if(xhconvertJntSpc > 15)
                   {
                        xhconvertJntSpc = 15;
                    }
                    if(xhconvertJntSpc < 6)
                   {
                        xhconvertJntSpc = 6;
                    }
                   if(request.ConvertToMetric)
            {
             response.MaximumJointSpacing = Math.Round((xhconvertJntSpc * ConvertFT),2).ToString();
            }
            else
            {
            response.MaximumJointSpacing = Math.Ceiling(xhconvertJntSpc * ConvertFT).ToString();           
            }
              
              thicknessmax = Math.Round(thicknessmax,2);
              thicknessmax = (Math.Ceiling(thicknessmax * 4) / 4) ;
              response.DesignThickness = thicknessmax.ToString("#0.00");             

            return response;
        }
    }
}
