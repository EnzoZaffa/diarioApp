import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
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
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/${item.id}`)} style={{ marginVertical: 15 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.title}</Text>
            <Text>{item.content}</Text>

            {/* -------- MOSTRAR A IMAGEM -------- */}
            {item.media_url && (
              <Image
                source={{ uri: item.media_url }}
                style={{
                  width: "100%",
                  height: 200,
                  marginTop: 10,
                  borderRadius: 8,
                }}
              />
            )}
          </TouchableOpacity>
        )}
      />

      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
