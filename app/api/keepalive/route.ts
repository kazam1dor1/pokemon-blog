import { NextResponse } from 'next/server';
import { supabase } from '@/app/utils/supabase';

export async function GET() {
  try {
    // データベースを起こすために、記事を1件だけ空読みする
    const { error } = await supabase
      .from('articles')
      .select('id')
      .limit(1);

    if (error) throw error;

    // 成功した場合は「起きてるよ！」と返す
    return NextResponse.json({ status: 'success', message: 'Supabase is awake!' });
  } catch (error) {
    console.error("Keep-Alive Error:", error);
    return NextResponse.json({ status: 'error', message: 'Failed to access Supabase' }, { status: 500 });
  }
}