import { supabase } from './supabase'

export async function getProducts() {
  const { data, error } = await supabase
    .from('produtos')
    .select('*')
    .eq('ativo', true)
    .order('criado_em', { ascending: false })

  if (error) {
    throw error
  }

  return data
}

export async function getProductById(id) {
  const { data, error } = await supabase
    .from('produtos')
    .select('*')
    .eq('id', id)
    .eq('ativo', true)
    .single()

  if (error) {
    throw error
  }

  return data
}