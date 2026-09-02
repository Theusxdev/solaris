import { useState } from 'react';

import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'solaris';
}

const suggestions = [
  'Criar meu currículo',
  'Melhorar meu currículo',
  'Encontrar vagas para mim',
  'Preparar para uma entrevista',
];

export default function AssistantScreen() {
  const [message, setMessage] = useState('');

  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = () => {
    const text = message.trim();

    if (!text) {
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
    };

    setMessages((current) => [
      ...current,
      userMessage,
    ]);

    setMessage('');

    setTimeout(() => {
      const solarisMessage: Message = {
        id: `${Date.now()}-solaris`,
        text: 'Entendi. Vou analisar isso para ajudar você da melhor maneira possível.',
        sender: 'solaris',
      };

      setMessages((current) => [
        ...current,
        solarisMessage,
      ]);
    }, 700);
  };

  const selectSuggestion = (suggestion: string) => {
    setMessage(suggestion);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.solarisIcon}>
              <Text style={styles.solarisIconText}>
                ☀
              </Text>
            </View>

            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>
                Solaris IA
              </Text>

              <Text style={styles.headerStatus}>
                Assistente de carreira
              </Text>
            </View>
          </View>

          <View style={styles.online}>
            <View style={styles.onlineDot} />

            <Text style={styles.onlineText}>
              Online
            </Text>
          </View>
        </View>

        {/* CONTEÚDO */}

        <ScrollView
          style={styles.messages}
          contentContainerStyle={styles.messagesContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
        >
          {messages.length === 0 ? (
            <View style={styles.emptyState}>
              <View style={styles.bigSolarisIcon}>
                <Text style={styles.bigSolarisIconText}>
                  ☀
                </Text>
              </View>

              <Text style={styles.welcomeTitle}>
                Olá, Matheus 👋
              </Text>

              <Text style={styles.welcomeText}>
                Eu sou a Solaris, sua assistente
                inteligente de carreira.
              </Text>

              <Text style={styles.question}>
                Como posso ajudar você hoje?
              </Text>

              <View style={styles.suggestions}>
                {suggestions.map((suggestion) => (
                  <Pressable
                    key={suggestion}
                    onPress={() =>
                      selectSuggestion(suggestion)
                    }
                    style={styles.suggestion}
                  >
                    <Text style={styles.suggestionText}>
                      {suggestion}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          ) : (
            <View>
              {messages.map((item) => (
                <View
                  key={item.id}
                  style={[
                    styles.messageRow,
                    item.sender === 'user'
                      ? styles.userRow
                      : styles.solarisRow,
                  ]}
                >
                  {item.sender === 'solaris' && (
                    <View style={styles.smallIcon}>
                      <Text style={styles.smallIconText}>
                        ☀
                      </Text>
                    </View>
                  )}

                  <View
                    style={[
                      styles.messageBubble,
                      item.sender === 'user'
                        ? styles.userBubble
                        : styles.solarisBubble,
                    ]}
                  >
                    <Text
                      style={[
                        styles.messageText,
                        item.sender === 'user'
                          ? styles.userMessageText
                          : styles.solarisMessageText,
                      ]}
                    >
                      {item.text}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </ScrollView>

        {/* CAMPO DE MENSAGEM */}

        <View style={styles.inputArea}>
          <View style={styles.inputContainer}>
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Digite sua mensagem..."
              placeholderTextColor={colors.textMuted}
              multiline
              textAlignVertical="center"
              style={styles.input}
              returnKeyType="default"
            />

            <Pressable
              onPress={sendMessage}
              disabled={!message.trim()}
              style={[
                styles.sendButton,
                !message.trim() &&
                  styles.sendButtonDisabled,
              ]}
            >
              <Text style={styles.sendIcon}>
                ➤
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,

    backgroundColor: colors.background,
  },

  keyboard: {
    flex: 1,
  },

  // HEADER

  header: {
    minHeight: 68,

    paddingHorizontal: spacing.lg,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: colors.background,

    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',

    flexShrink: 1,
  },

  headerTextContainer: {
    flexShrink: 1,
  },

  solarisIcon: {
    width: 40,
    height: 40,

    borderRadius: 20,

    backgroundColor: colors.primary,

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: spacing.sm,
  },

  solarisIconText: {
    color: colors.background,

    fontSize: 21,
    fontWeight: typography.weights.bold,
  },

  headerTitle: {
    color: colors.text,

    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
  },

  headerStatus: {
    color: colors.textMuted,

    fontSize: typography.sizes.xs,

    marginTop: 2,
  },

  online: {
    flexDirection: 'row',
    alignItems: 'center',

    marginLeft: spacing.sm,
  },

  onlineDot: {
    width: 7,
    height: 7,

    borderRadius: 4,

    backgroundColor: colors.success,

    marginRight: spacing.xs,
  },

  onlineText: {
    color: colors.textSecondary,

    fontSize: typography.sizes.xs,
  },

  // MENSAGENS

  messages: {
    flex: 1,
  },

  messagesContent: {
    flexGrow: 1,

    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,

    paddingBottom: spacing.xxxl,
  },

  emptyState: {
    flexGrow: 1,

    alignItems: 'center',

    paddingVertical: spacing.xxl,
  },

  bigSolarisIcon: {
    width: 72,
    height: 72,

    borderRadius: 36,

    backgroundColor: colors.primary,

    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: spacing.lg,
  },

  bigSolarisIconText: {
    color: colors.background,

    fontSize: 38,
    fontWeight: typography.weights.bold,
  },

  welcomeTitle: {
    color: colors.text,

    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,

    textAlign: 'center',
  },

  welcomeText: {
    color: colors.textSecondary,

    fontSize: typography.sizes.sm,

    lineHeight: 21,

    textAlign: 'center',

    maxWidth: 310,

    marginTop: spacing.sm,
  },

  question: {
    color: colors.text,

    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,

    textAlign: 'center',

    marginTop: spacing.xxl,
    marginBottom: spacing.md,
  },

  suggestions: {
    width: '100%',

    gap: spacing.sm,
  },

  suggestion: {
    width: '100%',

    minHeight: 48,

    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,

    borderRadius: 14,

    backgroundColor: colors.surface,

    borderWidth: 1,
    borderColor: colors.border,

    justifyContent: 'center',
  },

  suggestionText: {
    color: colors.text,

    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,

    textAlign: 'center',
  },

  // CHAT

  messageRow: {
    flexDirection: 'row',

    marginBottom: spacing.md,
  },

  userRow: {
    justifyContent: 'flex-end',
  },

  solarisRow: {
    justifyContent: 'flex-start',
  },

  smallIcon: {
    width: 30,
    height: 30,

    borderRadius: 15,

    backgroundColor: colors.primary,

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: spacing.sm,

    marginTop: 2,
  },

  smallIconText: {
    color: colors.background,

    fontSize: 15,
  },

  messageBubble: {
    maxWidth: '78%',

    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,

    borderRadius: 17,
  },

  userBubble: {
    backgroundColor: colors.primary,

    borderBottomRightRadius: 5,
  },

  solarisBubble: {
    backgroundColor: colors.surface,

    borderWidth: 1,
    borderColor: colors.border,

    borderBottomLeftRadius: 5,
  },

  messageText: {
    fontSize: typography.sizes.sm,

    lineHeight: 21,
  },

  userMessageText: {
    color: colors.background,
  },

  solarisMessageText: {
    color: colors.text,
  },

  // INPUT

  inputArea: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,

    backgroundColor: colors.background,

    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',

    width: '100%',
  },

  input: {
    flex: 1,

    minHeight: 46,
    maxHeight: 100,

    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,

    backgroundColor: colors.surface,

    borderWidth: 1,
    borderColor: colors.border,

    borderRadius: 23,

    color: colors.text,

    fontSize: typography.sizes.sm,

    marginRight: spacing.sm,
  },

  sendButton: {
    width: 46,
    height: 46,

    borderRadius: 23,

    backgroundColor: colors.primary,

    alignItems: 'center',
    justifyContent: 'center',
  },

  sendButtonDisabled: {
    opacity: 0.35,
  },

  sendIcon: {
    color: colors.background,

    fontSize: 19,

    fontWeight: typography.weights.bold,
  },
});