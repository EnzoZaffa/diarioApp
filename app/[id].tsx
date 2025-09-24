import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, Image, Text, View } from "react-native";
import { supabase } from "../src/lib/supabase";

export default function EntryDetail() {
  const { id } = useLocalSearchParams();
  const [entry, setEntry] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("entries").select("*").eq("id", id).single();
      setEntry(data);
    })();
  }, []);

  async function deleteEntry() {
    const { error } = await supabase.from("entries").delete().eq("id", id);
    if (error) {
      Alert.alert("Erro", error.message);
    } else {
      router.replace("/home");
    }
  }

  if (!entry) return <Text>Carregando...</Text>;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{entry.title}</Text>
      <Text>{entry.content}</Text>
      {entry.media_url && (
        <Image source={{ uri: entry.media_url }} style={{ width: "100%", height: 200 }} />
      )}
      <Button title="Excluir" onPress={deleteEntry} />
    </View>
  );
}
