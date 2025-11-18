import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Button, Image, Text, View } from "react-native";
import { supabase } from "../src/lib/supabase";

export default function EntryDetail() {
  const { id } = useLocalSearchParams();
  const [entry, setEntry] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("entries")
        .select("*")
        .eq("id", id)
        .single();

      if (!error) setEntry(data);
      setLoading(false);
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

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  if (!entry) return <Text>Entrada não encontrada.</Text>;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
        {entry.title}
      </Text>

      <Text style={{ fontSize: 16, marginBottom: 20 }}>
        {entry.content}
      </Text>

      {/* Exibir imagem maior e bem estilizada */}
      {entry.media_url && (
        <Image
          source={{ uri: entry.media_url }}
          style={{
            width: "100%",
            height: 300,
            borderRadius: 12,
            marginBottom: 20,
            backgroundColor: "#ccc",
          }}
          resizeMode="cover"
        />
      )}

      <Button title="Excluir" onPress={deleteEntry} />
    </View>
  );
}
