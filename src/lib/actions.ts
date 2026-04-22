'use server';

import { getSupabaseAdmin } from './supabase';

export async function submitContactForm(formData: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  const supabase = getSupabaseAdmin();

  try {
    const { error } = await supabase
      .from('contact_messages')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        },
      ]);

    if (error) throw error;

    return { success: true };
  } catch (error: any) {
    console.error('Submit contact form error:', error);
    return { success: false, error: error.message };
  }
}

export async function getContactMessages() {
  const supabase = getSupabaseAdmin();

  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data };
  } catch (error: any) {
    console.error('Get messages error:', error);
    return { success: false, error: error.message };
  }
}

export async function markMessageAsRead(id: string) {
  const supabase = getSupabaseAdmin();

  try {
    const { error } = await supabase
      .from('contact_messages')
      .update({ is_read: true })
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error('Mark as read error:', error);
    return { success: false, error: error.message };
  }
}

export async function deleteMessage(id: string) {
  const supabase = getSupabaseAdmin();

  try {
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error('Delete message error:', error);
    return { success: false, error: error.message };
  }
}

export async function inviteUser(email: string) {
  const supabase = getSupabaseAdmin();
  
  try {
    const { data, error } = await supabase.auth.admin.inviteUserByEmail(email);
    if (error) throw error;
    return { success: true, data };
  } catch (error: any) {
    console.error('Invite user error:', error);
    return { success: false, error: error.message };
  }
}

export async function listUsers() {
  const supabase = getSupabaseAdmin();
  
  try {
    const { data, error } = await supabase.auth.admin.listUsers();
    if (error) throw error;
    return { success: true, users: data.users };
  } catch (error: any) {
    console.error('List users error:', error);
    return { success: false, error: error.message };
  }
}

export async function deleteUser(userId: string) {
  const supabase = getSupabaseAdmin();
  
  try {
    const { error } = await supabase.auth.admin.deleteUser(userId);
    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error('Delete user error:', error);
    return { success: false, error: error.message };
  }
}

export async function changeUserPassword(userId: string, newPassword: string) {
  const supabase = getSupabaseAdmin();
  
  try {
    const { error } = await supabase.auth.admin.updateUserById(userId, {
      password: newPassword
    });
    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error('Update password error:', error);
    return { success: false, error: error.message };
  }
}

export async function getSiteContent() {
  const supabase = getSupabaseAdmin();
  try {
    const { data, error } = await supabase
      .from('site_content')
      .select('*');
    if (error) throw error;
    
    // Transform array to key-value object
    const content = data.reduce((acc: any, item: any) => {
      acc[item.section_key] = item.content;
      return acc;
    }, {});
    
    return { success: true, content };
  } catch (error: any) {
    console.error('Get site content error:', error);
    return { success: false, error: error.message };
  }
}

export async function updateSiteContent(sectionKey: string, newContent: any) {
  const supabase = getSupabaseAdmin();
  try {
    const { error } = await supabase
      .from('site_content')
      .upsert({ section_key: sectionKey, content: newContent }, { onConflict: 'section_key' });
    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error('Update site content error:', error);
    return { success: false, error: error.message };
  }
}
