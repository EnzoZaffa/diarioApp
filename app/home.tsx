import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, FlatList, Text, TouchableOpacity, View } from "react-native";
import { supabase } from "../src/lib/supabase";

export default function Home() {
  const [entries, setEntries] = useState<any[]>([]);
  const router = useRouter();

  async function fetchEntries() {
    const { data, error } = await supabase
      .from("entries")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setEntries(data || []);
  }

  useEffect(() => {
    fetchEntries();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Nova entrada" onPress={() => router.push("/new-entry")} />
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/${item.id}`)}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.title}</Text>
            <Text>{item.content}</Text>
          </TouchableOpacity>
        )}
      />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
