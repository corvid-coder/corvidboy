export type word = number
export type byte = number

/*
  A, F, B, C, D, E, H, L  : 8-bit register
  AF, BC, DE, HL, PC, SP  : 16-bit register
  b                       : byte (8 bits)
  w                       : word (16 bits)
  s                       : signed 8 bit integer
  a                       : address is 0xFF00 + a (byte offset)
  aa                      : 16 bit address
  i                       : post increment
  d                       : post decrement
*/

export enum OPS { 
  LD_BC_w  = 0x01,
  LD_BC_A  = 0x02,
  LD_B_b   = 0x06,
  LD_aa_SP = 0x08,
  LD_A_BC  = 0x0A,
  LD_C_b   = 0x0E,
  
  LD_DE_w  = 0x11,
  LD_DE_A  = 0x12,
  LD_D_b   = 0x16,
  LD_A_DE  = 0x1A,
  LD_E_b   = 0x1E,
  
  LD_HL_w  = 0x21,
  LD_HLi_A = 0x22,
  LD_H_b   = 0x26,
  LD_A_HLi = 0x2A,
  LD_L_b   = 0x2E,
  
  LD_SP_w  = 0x31,
  LD_HLd_A = 0x32,
  LD_HL_b  = 0x36,
  LD_A_HLd = 0x3A,
  LD_A_b   = 0x3E,
  
  LD_B_B   = 0x40,
  LD_B_C   = 0x41,
  LD_B_D   = 0x42,
  LD_B_E   = 0x43,
  LD_B_H   = 0x44,
  LD_B_L   = 0x45,
  LD_B_HL  = 0x46,
  LD_B_A   = 0x47,
  LD_C_B   = 0x48,
  LD_C_C   = 0x49,
  LD_C_D   = 0x4A,
  LD_C_E   = 0x4B,
  LD_C_H   = 0x4C,
  LD_C_L   = 0x4D,
  LD_C_HL  = 0x4E,
  LD_C_A   = 0x4F,
  
  LD_D_B   = 0x50,
  LD_D_C   = 0x51,
  LD_D_D   = 0x52, 
  LD_D_E   = 0x53,
  LD_D_H   = 0x54,
  LD_D_L   = 0x55,
  LD_D_HL  = 0x56,
  LD_D_A   = 0x57,
  LD_E_B   = 0x58,
  LD_E_C   = 0x59,
  LD_E_D   = 0x5A,
  LD_E_E   = 0x5B,
  LD_E_H   = 0x5C,
  LD_E_L   = 0x5D,
  LD_E_HL  = 0x5E,
  LD_E_A   = 0x5F,
  
  LD_H_B   = 0x60,
  LD_H_C   = 0x61,
  LD_H_D   = 0x62,
  LD_H_E   = 0x63,
  LD_H_H   = 0x64,
  LD_H_L   = 0x65,
  LD_H_HL  = 0x66,
  LD_H_A   = 0x67,
  LD_L_B   = 0x68,
  LD_L_C   = 0x69,
  LD_L_D   = 0x6A,
  LD_L_E   = 0x6B,
  LD_L_H   = 0x6C,
  LD_L_L   = 0x6D,
  LD_L_HL  = 0x6E,
  LD_L_A   = 0x6F,
  
  LD_HL_B  = 0x70,
  LD_HL_C  = 0x71,
  LD_HL_D  = 0x72,
  LD_HL_E  = 0x73,
  LD_HL_H  = 0x74,
  LD_HL_L  = 0x75,
  LD_HL_A  = 0x77,
  LD_A_B   = 0x78,
  LD_A_C   = 0x79,
  LD_A_D   = 0x7A,
  LD_A_E   = 0x7B,
  LD_A_H   = 0x7C,
  LD_A_L   = 0x7D,
  LD_A_HL  = 0x7E,
  LD_A_A   = 0x7F,
  
  POP_BC   = 0xC1,
  PUSH_BC  = 0xC5,
  
  POP_DE   = 0xD1,
  PUSH_DE  = 0xD5,
  
  LDH_a_A  = 0xE0,
  POP_HL   = 0xE1,
  LD_Ca_A  = 0xE2,
  PUSH_HL  = 0xE5,
  LD_aa_A  = 0xEA,
  
  LD_A_a   = 0xF0,
  POP_AF   = 0xF1,
  LD_A_Ca  = 0xF2,
  PUSH_AF  = 0xF5,
  LD_HL_SPs= 0xF8,
  LD_SP_HL = 0xF9,
  LD_A_aa  = 0xFA,
}