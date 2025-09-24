import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, Image, TextInput, View } from "react-native";
import { supabase } from "../src/lib/supabase";

export default function NewEntry() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [media, setMedia] = useState<string | null>(null);
  const router = useRouter();

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
    });

    if (!result.canceled) {
      const file = result.assets[0];
      const ext = file.uri.split(".").pop();
      const filePath = `${Date.now()}.${ext}`;

      try {
        // pega o blob
        const response = await fetch(file.uri);
        const blob = await response.blob();

        const { error: uploadError } = await supabase.storage
          .from("media")
          .upload(filePath, blob);

        if (uploadError) {
          Alert.alert("Erro", uploadError.message);
        } else {
          const { data } = supabase.storage.from("media").getPublicUrl(filePath);
          console.log("URL pública:", data.publicUrl);
          setMedia(data.publicUrl); // salva a URL no estado
        }
      } catch (e: any) {
        Alert.alert("Erro ao carregar imagem", e.message);
      }
    }
  }

  async function saveEntry() {
    const { error } = await supabase.from("entries").insert({
      title,
      content,
      media_url: media,
    });

    if (error) {
      Alert.alert("Erro", error.message);
    } else {
      router.replace("/home");
    }
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput placeholder="Título" value={title} onChangeText={setTitle} />
      <TextInput
        placeholder="Conteúdo"
        value={content}
        onChangeText={setContent}
        multiline
        style={{ height: 100 }}
      />

      {/* Preview da imagem */}
      {media && (
        <Image
          source={{ uri: media }}
          style={{
            width: "100%",
            height: 200,
            marginVertical: 10,
            borderRadius: 8,
          }}
          resizeMode="cover"
        />
      )}

      <Button title="Escolher mídia" onPress={pickImage} />
      <Button title="Salvar" onPress={saveEntry} />
    </View>
  );
}
