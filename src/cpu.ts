import { byte, word, OPS } from "./types.js"
import { shouldNever } from "./utility.js"
import { MMU } from "./mmu.js"

export interface registers {
  [index: string]: byte | word,
  a: byte,
  f: byte,
  b: byte,
  c: byte,
  d: byte,
  e: byte,
  h: byte,
  l: byte,
  
  sp: word,
  pc: word,
}

export class CPU {
  registers: registers  = new Proxy<registers>({
    a: 0, f: 0,
    b: 0, c: 0,
    d: 0, e: 0,
    h: 0, l: 0,
    sp: 0,
    pc: 0,
  }, {
    get(rs, r): byte | word {
       if (r === "af") {
        return rs.a << 8 + rs.f
      } else if (r === "bc") {
        return rs.b << 8 + rs.c
      } else if (r === "de") {
        return rs.d << 8 + rs.e
      } else if (r === "hl") {
        return rs.h << 8 + rs.l
      } else {
        return rs[r]
      }
    },
    set(rs, r, value) : boolean {
       if (r === "af") {
        rs.a = value >> 8
        rs.f = value & 0xFF
      } else if (r === "bc") {
        rs.b = value >> 8
        rs.c = value & 0xFF
      } else if (r === "de") {
        rs.d = value >> 8
        rs.e = value & 0xFF
      } else if (r === "hl") {
        rs.h = value >> 8
        rs.l = value & 0xFF
      }
      return true
    }
  })
  
  constructor (public mmu: MMU) {}
  
  step () {
    const pc = this.registers.pc
    const op : OPS = this.mmu.read_b(pc) as OPS
    let bytes = 1
    switch(op) {
      
      //TODO: IMPLEMENT ALL FLAGS
      
      case OPS.LD_A_b:
        this.registers.a = this.mmu.read_b(pc + 1)
        bytes += 1
        break
      case OPS.LD_A_A:
        this.registers.a = this.registers.a
        break
      case OPS.LD_A_B:
        this.registers.a = this.registers.b
        break
      case OPS.LD_A_C:
        this.registers.a = this.registers.c
        break
      case OPS.LD_A_D:
        this.registers.a = this.registers.d
        break
      case OPS.LD_A_E:
        this.registers.a = this.registers.e
        break
      case OPS.LD_A_H:
        this.registers.a = this.registers.h
        break
      case OPS.LD_A_L:
        this.registers.a = this.registers.l
        break
      case OPS.LD_A_BC:
        this.registers.a = this.mmu.read_b(this.registers.bc)
        break
      case OPS.LD_A_DE:
        this.registers.a = this.mmu.read_b(this.registers.de)
        break
      case OPS.LD_A_HL:
        this.registers.a = this.mmu.read_b(this.registers.hl)
        break
      case OPS.LD_A_HLi:
        this.registers.a = this.mmu.read_b(this.registers.hl)
        this.registers.hl += 1
        break
      case OPS.LD_A_HLd:
        this.registers.a = this.mmu.read_b(this.registers.hl)
        this.registers.hl -= 1
        break
      case OPS.LD_A_a:
        this.registers.a = this.mmu.read_b(0xFF00 + this.mmu.read_b(pc + 1))
        bytes += 1
        break
      case OPS.LD_A_Ca:
        this.registers.a = this.mmu.read_b(0xFF00 + this.registers.c)
        break
      case OPS.LD_A_aa:
        this.registers.a = this.mmu.read_b(this.mmu.read_w(pc + 1))
        bytes += 2
        break
        
      case OPS.LD_B_b:
        this.registers.b = this.mmu.read_b(pc + 1)
        bytes += 1
        break
      case OPS.LD_B_A:
        this.registers.b = this.registers.a
        break
      case OPS.LD_B_B:
        this.registers.b = this.registers.b
        break
      case OPS.LD_B_C:
        this.registers.b = this.registers.c
        break
      case OPS.LD_B_D:
        this.registers.b = this.registers.d 
        break
      case OPS.LD_B_E:
        this.registers.b = this.registers.e
        break
      case OPS.LD_B_H:
        this.registers.b = this.registers.h
        break
      case OPS.LD_B_L:
        this.registers.b = this.registers.l
        break
      case OPS.LD_B_HL:
        this.registers.b = this.mmu.read_b(this.registers.hl)
        break
        
      case OPS.LD_C_b:
        this.registers.c = this.mmu.read_b(pc + 1)
        bytes += 1
        break
      case OPS.LD_C_A:
        this.registers.d = this.registers.a
        break
      case OPS.LD_C_B:
        this.registers.c = this.registers.b
        break
      case OPS.LD_C_C:
        this.registers.c = this.registers.c
        break
      case OPS.LD_C_D:
        this.registers.c = this.registers.d 
        break
      case OPS.LD_C_E:
        this.registers.c = this.registers.e
        break
      case OPS.LD_C_H:
        this.registers.c = this.registers.h
        break
      case OPS.LD_C_L:
        this.registers.c = this.registers.l
        break
      case OPS.LD_C_HL:
        this.registers.c = this.mmu.read_b(this.registers.hl)
        break
        
      case OPS.LD_D_b:
        this.registers.d = this.mmu.read_b(pc + 1)
        bytes += 1
        break
      case OPS.LD_D_A:
        this.registers.d = this.registers.a
        break
      case OPS.LD_D_B:
        this.registers.d = this.registers.b
        break
      case OPS.LD_D_C:
        this.registers.d = this.registers.c
        break
      case OPS.LD_D_D:
        this.registers.d = this.registers.d 
        break
      case OPS.LD_D_E:
        this.registers.d = this.registers.e
        break
      case OPS.LD_D_H:
        this.registers.d = this.registers.h
        break
      case OPS.LD_D_L:
        this.registers.d = this.registers.l
        break
      case OPS.LD_D_HL:
        this.registers.d = this.mmu.read_b(this.registers.hl)
        break
        
      case OPS.LD_E_b:
        this.registers.e = this.mmu.read_b(pc + 1)
        bytes += 1
        break
      case OPS.LD_E_A:
        this.registers.e = this.registers.a
        break
      case OPS.LD_E_B:
        this.registers.e = this.registers.b
        break
      case OPS.LD_E_C:
        this.registers.e = this.registers.c
        break
      case OPS.LD_E_D:
        this.registers.e = this.registers.d 
        break
      case OPS.LD_E_E:
        this.registers.e = this.registers.e
        break
      case OPS.LD_E_H:
        this.registers.e = this.registers.h
        break
      case OPS.LD_E_L:
        this.registers.e = this.registers.l
        break
      case OPS.LD_E_HL:
        this.registers.e = this.mmu.read_b(this.registers.hl)
        break
        
      case OPS.LD_H_b:
        this.registers.h = this.mmu.read_b(pc + 1)
        bytes += 1
        break
      case OPS.LD_H_A:
        this.registers.h = this.registers.a
        break
      case OPS.LD_H_B:
        this.registers.h = this.registers.b
        break
      case OPS.LD_H_C:
        this.registers.h = this.registers.c
        break
      case OPS.LD_H_D:
        this.registers.h = this.registers.d 
        break
      case OPS.LD_H_E:
        this.registers.h = this.registers.e
        break
      case OPS.LD_H_H:
        this.registers.h = this.registers.h
        break
      case OPS.LD_H_L:
        this.registers.h = this.registers.l
        break
      case OPS.LD_H_HL:
        this.registers.h = this.mmu.read_b(this.registers.hl)
        break
        
      case OPS.LD_L_b:
        this.registers.l = this.mmu.read_b(pc + 1)
        bytes += 1
        break
      case OPS.LD_L_A:
        this.registers.l = this.registers.a
        break
      case OPS.LD_L_B:
        this.registers.l = this.registers.b
        break
      case OPS.LD_L_C:
        this.registers.l = this.registers.c
        break
      case OPS.LD_L_D:
        this.registers.l = this.registers.d 
        break
      case OPS.LD_L_E:
        this.registers.l = this.registers.e
        break
      case OPS.LD_L_H:
        this.registers.l = this.registers.h
        break
      case OPS.LD_L_L:
        this.registers.l = this.registers.l
        break
      case OPS.LD_L_HL:
        this.registers.l = this.mmu.read_b(this.registers.hl)
        break
      
      case OPS.LD_BC_w:
        this.registers.bc = this.mmu.read_w(pc + 1)
        bytes += 2
        break
      case OPS.LD_BC_A:
        this.mmu.write_b(this.registers.bc, this.registers.a)
        bytes += 1
        break
        
        
      case OPS.LD_DE_w:
        this.registers.de = this.mmu.read_w(pc + 1)
        bytes += 2
        break
      case OPS.LD_DE_A:
        this.mmu.write_b(this.registers.de, this.registers.a)
        bytes += 1
        break
        
      case OPS.LD_HL_b:
        this.mmu.write_b(this.registers.hl, this.mmu.read_b(pc + 1))
        bytes += 1
        break
      case OPS.LD_HL_w:
        this.registers.hl = this.mmu.read_w(pc + 1)
        bytes += 2
        break
      case OPS.LD_HL_A:
        this.mmu.write_b(this.registers.hl, this.registers.a)
        break
      case OPS.LD_HLi_A:
        this.mmu.write_b(this.registers.hl, this.registers.a)
        this.registers.hl += 1
        break
      case OPS.LD_HLd_A:
        this.mmu.write_b(this.registers.hl, this.registers.a)
        this.registers.hl -= 1
        break
      case OPS.LD_HL_B:
        this.mmu.write_b(this.registers.hl, this.registers.b)
        break
      case OPS.LD_HL_C:
        this.mmu.write_b(this.registers.hl, this.registers.c)
        break
      case OPS.LD_HL_D:
        this.mmu.write_b(this.registers.hl, this.registers.d)
        break
      case OPS.LD_HL_E:
        this.mmu.write_b(this.registers.hl, this.registers.e)
        break
      case OPS.LD_HL_H:
        this.mmu.write_b(this.registers.hl, this.registers.h)
        break
      case OPS.LD_HL_L:
        this.mmu.write_b(this.registers.hl, this.registers.l)
        break
      
      case OPS.LDH_a_A:
        this.mmu.write_b(0xFF00 + this.mmu.read_b(pc + 1), this.registers.a)
        bytes += 1
        break
      case OPS.LD_Ca_A:
        this.mmu.write_b(0xFF00 + this.registers.c, this.registers.a)
        break
      case OPS.LD_aa_A:
        this.mmu.write_b(this.mmu.read_w(pc + 1), this.registers.a)
        bytes += 2
        break
        
      case OPS.PUSH_AF:
        this.registers.sp += 2
        this.mmu.write_b(this.registers.sp, this.registers.af)
        break
      case OPS.PUSH_BC:
        this.registers.sp += 2
        this.mmu.write_b(this.registers.sp, this.registers.bc)
        break
      case OPS.PUSH_DE:
        this.registers.sp += 2
        this.mmu.write_b(this.registers.sp, this.registers.de)
        break
      case OPS.PUSH_HL:
        this.registers.sp += 2
        this.mmu.write_b(this.registers.sp, this.registers.hl)
        break
      case OPS.POP_AF:
        this.registers.af = this.mmu.read_w(this.registers.sp)
        this.registers.sp += 2
        break
      case OPS.POP_BC:
        this.registers.bc = this.mmu.read_w(this.registers.sp)
        this.registers.sp += 2
        break
      case OPS.POP_DE:
        this.registers.de = this.mmu.read_w(this.registers.sp)
        this.registers.sp += 2
        break
      case OPS.POP_HL:
        this.registers.hl = this.mmu.read_w(this.registers.sp)
        this.registers.sp += 2
        break
      case OPS.LD_SP_w:
        this.registers.sp = this.mmu.read_w(pc + 1)
        bytes += 2
        break
      case OPS.LD_SP_HL:
        this.registers.sp = this.registers.hl
        break
      case OPS.LD_HL_SPs:
        this.registers.hl = this.registers.sp + this.mmu.read_b(pc + 1) - 128
        bytes += 1
        break
      case OPS.LD_aa_SP:
        this.mmu.write_w(this.mmu.read_w(pc + 1), this.registers.sp)
        bytes += 2
        break
      
      default:
        shouldNever(op)
    }
    this.registers.pc += bytes
  }
}