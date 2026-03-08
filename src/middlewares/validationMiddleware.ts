import { NextResponse } from 'next/server';
import { ZodSchema } from 'zod';

export const validationMiddleware = async (schema: ZodSchema, data: any) => {
  const result = schema.safeParse(data);
  
  if (!result.success) {
    return NextResponse.json({ 
      message: 'Validation failed', 
      errors: result.error.flatten().fieldErrors 
    }, { status: 400 });
  }

  return null;
};
