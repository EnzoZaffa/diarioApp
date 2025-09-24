import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, TextInput, View } from "react-native";
import { supabase } from "../src/lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      Alert.alert("Erro", error.message);
    } else {
      router.replace("/home");
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />
      <Button title="Entrar" onPress={handleLogin} />
      <Button title="Cadastrar" onPress={() => router.push("/register")} />
    </View>
  );
}
