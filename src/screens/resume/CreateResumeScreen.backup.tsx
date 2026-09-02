import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useState } from 'react';

import { useResume } from '../../context/ResumeContext';

export default function CreateResumeScreen() {
  const { resume, updatePersonal } = useResume();

  const [currentStep, setCurrentStep] = useState(1);

  const renderPersonalStep = () => { 
    return (
      <>
        <View style={styles.header}>
          <Text style={styles.step}>
            ETAPA 1 DE 6
          </Text>

          <Text style={styles.title}>
            Dados pessoais
          </Text>

          <Text style={styles.subtitle}>
            Comece preenchendo suas informações básicas.
          </Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.inputLabel}>
            Nome completo
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Digite seu nome completo"
            placeholderTextColor="#6F7B88"
            value={resume.personal.name}
            onChangeText={(text) =>
              updatePersonal({ name: text })
            }
          />

          <Text style={styles.inputLabel}>
            E-mail
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            placeholderTextColor="#6F7B88"
            keyboardType="email-address"
            autoCapitalize="none"
            value={resume.personal.email}
            onChangeText={(text) =>
              updatePersonal({ email: text })
            }
          />

          <Text style={styles.inputLabel}>
            Telefone
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Digite seu telefone"
            placeholderTextColor="#6F7B88"
            keyboardType="phone-pad"
            value={resume.personal.phone}
            onChangeText={(text) =>
              updatePersonal({ phone: text })
            }
          />

          <Text style={styles.inputLabel}>
            Cidade
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ex.: São Luís, MA"
            placeholderTextColor="#6F7B88"
            value={resume.personal.city}
            onChangeText={(text) =>
              updatePersonal({ city: text })
            }
          />
        </View>

        <Pressable
          style={styles.primaryButton}
          onPress={() => setCurrentStep(2)}
        >
          <Text style={styles.primaryButtonText}>
            Continuar →
          </Text>
        </Pressable>
      </>
    );
  };



  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* CABEÇALHO */}

        <View style={styles.header}>
          <Text style={styles.step}>
            ETAPA 6 DE 6
          </Text>

          <Text style={styles.title}>
            Revise seu currículo
          </Text>

          <Text style={styles.subtitle}>
            Confira suas informações antes de finalizar.
          </Text>
        </View>

        {/* PROGRESSO */}

        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>
              Currículo completo
            </Text>

            <Text style={styles.progressPercentage}>
              100%
            </Text>
          </View>

          <View style={styles.progressBackground}>
            <View style={styles.progressBar} />
          </View>
        </View>

        {/* DADOS PESSOAIS */}

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionNumber}>
                01
              </Text>

              <Text style={styles.sectionTitle}>
                Dados pessoais
              </Text>
            </View>

            <Pressable>
              <Text style={styles.editText}>
                Editar
              </Text>
            </Pressable>
          </View>

          <View style={styles.divider} />

          <Text style={styles.name}>
            {resume.personal.name || 'Nome não informado'}
          </Text>

          <Text style={styles.info}>
            {resume.personal.email || 'E-mail não informado'}
          </Text>

          <Text style={styles.info}>
            {resume.personal.phone || 'Telefone não informado'}
          </Text>

          <Text style={styles.info}>
            {resume.personal.city || 'Cidade não informada'}
          </Text>
        </View>

        {/* EXPERIÊNCIA */}

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionNumber}>
                02
              </Text>

              <Text style={styles.sectionTitle}>
                Experiência profissional
              </Text>
            </View>

            <Pressable>
              <Text style={styles.editText}>
                Editar
              </Text>
            </Pressable>
          </View>

          <View style={styles.divider} />

          <Text style={styles.jobTitle}>
            Desenvolvedor de Software
          </Text>

          <Text style={styles.company}>
            Empresa / Organização
          </Text>

          <Text style={styles.period}>
            2024 — Atual
          </Text>

          <Text style={styles.description}>
            Desenvolvimento e manutenção de aplicações,
            implementação de novas funcionalidades e colaboração
            com equipes de tecnologia.
          </Text>
        </View>

        {/* FORMAÇÃO */}

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionNumber}>
                03
              </Text>

              <Text style={styles.sectionTitle}>
                Formação acadêmica
              </Text>
            </View>

            <Pressable>
              <Text style={styles.editText}>
                Editar
              </Text>
            </Pressable>
          </View>

          <View style={styles.divider} />

          <Text style={styles.jobTitle}>
            Análise e Desenvolvimento de Sistemas
          </Text>

          <Text style={styles.company}>
            Instituição de Ensino
          </Text>

          <Text style={styles.period}>
            2023 — 2026
          </Text>
        </View>

        {/* HABILIDADES */}

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionNumber}>
                04
              </Text>

              <Text style={styles.sectionTitle}>
                Habilidades
              </Text>
            </View>

            <Pressable>
              <Text style={styles.editText}>
                Editar
              </Text>
            </Pressable>
          </View>

          <View style={styles.divider} />

          <View style={styles.skillsContainer}>
            {resume.skills.length > 0 ? (
              resume.skills.map((skill) => (
                <Skill
                  key={skill}
                  text={skill}
                />
              ))
            ) : (
              <Text style={styles.info}>
                Nenhuma habilidade adicionada.
              </Text>
            )}
          </View>
        </View>

        {/* OBJETIVO */}

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionNumber}>
                05
              </Text>

              <Text style={styles.sectionTitle}>
                Objetivo profissional
              </Text>
            </View>

            <Pressable>
              <Text style={styles.editText}>
                Editar
              </Text>
            </Pressable>
          </View>

          <View style={styles.divider} />

          <View style={styles.objectiveInfo}>
            <Text style={styles.objectiveLabel}>
              Cargo desejado
            </Text>

            <Text style={styles.objectiveValue}>
              {resume.objective.desiredPosition ||
                'Não informado'}
            </Text>
          </View>

          <View style={styles.objectiveInfo}>
            <Text style={styles.objectiveLabel}>
              Área
            </Text>

            <Text style={styles.objectiveValue}>
              {resume.objective.area ||
                'Não informado'}
            </Text>
          </View>

          <View style={styles.objectiveInfo}>
            <Text style={styles.objectiveLabel}>
              Nível
            </Text>

            <Text style={styles.objectiveValue}>
              {resume.objective.level ||
                'Não informado'}
            </Text>
          </View>

          <Text style={styles.description}>
            {resume.objective.description ||
              'Nenhum objetivo profissional informado.'}
          </Text>
        </View>

        {/* DICA SOLARIS */}

        <View style={styles.tipCard}>
          <Text style={styles.tipIcon}>
            ✦
          </Text>

          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>
              Análise da Solaris
            </Text>

            <Text style={styles.tipText}>
              Seu currículo está pronto para ser finalizado.
              Depois desta etapa, a Solaris poderá analisar
              suas informações e sugerir melhorias.
            </Text>
          </View>
        </View>

        {/* FINALIZAÇÃO */}

        <View style={styles.finalCard}>
          <View style={styles.finalIcon}>
            <Text style={styles.finalIconText}>
              ✓
            </Text>
          </View>

          <Text style={styles.finalTitle}>
            Tudo pronto!
          </Text>

          <Text style={styles.finalDescription}>
            Ao finalizar, seu currículo será salvo no seu
            perfil e poderá ser editado posteriormente.
          </Text>

          <Pressable style={styles.finishButton}>
            <Text style={styles.finishButtonText}>
              Finalizar currículo
            </Text>
          </Pressable>
        </View>

        {/* VOLTAR */}

        <Pressable style={styles.backButton}>
          <Text style={styles.backText}>
            ← Voltar e editar
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

function Skill({ text }: { text: string }) {
  return (
    <View style={styles.skillTag}>
      <Text style={styles.skillText}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F14',
  },

  content: {
    padding: 20,
    paddingTop: 24,
    paddingBottom: 45,
  },

  header: {
    marginBottom: 20,
  },

  step: {
    color: '#F5B942',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 7,
  },

  title: {
    color: '#F5F7FA',
    fontSize: 27,
    fontWeight: '700',
  },

  subtitle: {
    color: '#7E8A97',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 7,
  },

  formCard: {
    backgroundColor: '#111820',
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
  },

  inputLabel: {
    color: '#F5F7FA',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 14,
  },

  input: {
    backgroundColor: '#0B0F14',
    borderWidth: 1,
    borderColor: '#28313C',
    borderRadius: 12,
    color: '#F5F7FA',
    fontSize: 16,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },

  primaryButton: {
    backgroundColor: '#F5B942',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },

  primaryButtonText: {
    color: '#0B0F14',
    fontSize: 16,
    fontWeight: '700',
  },

  // PROGRESSO

  progressContainer: {
    marginBottom: 20,
  },

  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  progressLabel: {
    color: '#8D99A6',
    fontSize: 12,
    fontWeight: '600',
  },

  progressPercentage: {
    color: '#F5B942',
    fontSize: 12,
    fontWeight: '700',
  },

  progressBackground: {
    height: 6,
    backgroundColor: '#202933',
    borderRadius: 10,
    overflow: 'hidden',
  },

  progressBar: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F5B942',
    borderRadius: 10,
  },

  // CARDS

  sectionCard: {
    backgroundColor: '#111820',
    borderWidth: 1,
    borderColor: '#28313C',
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  sectionNumber: {
    color: '#F5B942',
    fontSize: 10,
    fontWeight: '800',
    marginBottom: 3,
  },

  sectionTitle: {
    color: '#F5F7FA',
    fontSize: 16,
    fontWeight: '700',
  },

  editText: {
    color: '#F5B942',
    fontSize: 12,
    fontWeight: '700',
  },

  divider: {
    height: 1,
    backgroundColor: '#28313C',
    marginVertical: 15,
  },

  name: {
    color: '#F5F7FA',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 7,
  },

  info: {
    color: '#8D99A6',
    fontSize: 13,
    marginBottom: 4,
  },

  jobTitle: {
    color: '#E8EDF2',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 5,
  },

  company: {
    color: '#AAB4BF',
    fontSize: 13,
    marginBottom: 4,
  },

  period: {
    color: '#6F7B88',
    fontSize: 12,
    marginBottom: 12,
  },

  description: {
    color: '#8D99A6',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 12,
  },

  // HABILIDADES

  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  skillTag: {
    backgroundColor: '#1B232D',
    borderWidth: 1,
    borderColor: '#34404D',
    borderRadius: 20,
    paddingHorizontal: 13,
    paddingVertical: 8,
  },

  skillText: {
    color: '#DDE3E9',
    fontSize: 12,
    fontWeight: '600',
  },

  // OBJETIVO

  objectiveInfo: {
    marginBottom: 10,
  },

  objectiveLabel: {
    color: '#6F7B88',
    fontSize: 11,
    marginBottom: 3,
  },

  objectiveValue: {
    color: '#E1E6EB',
    fontSize: 13,
    fontWeight: '600',
  },

  // SOLARIS

  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#151D26',
    borderWidth: 1,
    borderColor: '#3B3424',
    borderRadius: 15,
    padding: 15,
    marginTop: 2,
    marginBottom: 16,
  },

  tipIcon: {
    color: '#F5B942',
    fontSize: 22,
    marginRight: 12,
  },

  tipContent: {
    flex: 1,
  },

  tipTitle: {
    color: '#F5B942',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },

  tipText: {
    color: '#8D99A6',
    fontSize: 12,
    lineHeight: 18,
  },

  // FINALIZAÇÃO

  finalCard: {
    backgroundColor: '#111820',
    borderWidth: 1,
    borderColor: '#3B3424',
    borderRadius: 20,
    padding: 22,
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 14,
  },

  finalIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#F5B942',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  finalIconText: {
    color: '#0B0F14',
    fontSize: 24,
    fontWeight: '800',
  },

  finalTitle: {
    color: '#F5F7FA',
    fontSize: 19,
    fontWeight: '700',
  },

  finalDescription: {
    color: '#7E8A97',
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    marginTop: 7,
    marginBottom: 18,
  },

  finishButton: {
    width: '100%',
    height: 52,
    backgroundColor: '#F5B942',
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },

  finishButtonText: {
    color: '#0B0F14',
    fontSize: 14,
    fontWeight: '700',
  },

  backButton: {
    alignItems: 'center',
    paddingVertical: 14,
  },

  backText: {
    color: '#7E8A97',
    fontSize: 13,
    fontWeight: '600',
  },
});