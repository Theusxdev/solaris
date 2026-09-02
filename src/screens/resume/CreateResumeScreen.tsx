import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';


import { useResume } from '../../context/ResumeContext';

import { useState } from 'react';

import { useSavedResumes } from '../../context/SavedResumesContext';

export default function CreateResumeScreen() {
  const {
    resume,
    updatePersonal,
    clearResume,
    addExperience,
    addEducation,
    addSkill,
    removeSkill,
    updateObjective,
  } = useResume();

  const { saveResume } = useSavedResumes();

  const [currentStep, setCurrentStep] = useState(1);

  // EXPERIÊNCIA
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');

  // FORMAÇÃO
  const [course, setCourse] = useState('');
  const [institution, setInstitution] = useState('');
  const [educationStartDate, setEducationStartDate] = useState('');
  const [educationEndDate, setEducationEndDate] = useState('');

  //Habilidade
  const [skillInput, setSkillInput] = useState('');

  // OBJETIVO PROFISSIONAL
  const [desiredPosition, setDesiredPosition] = useState('');
  const [area, setArea] = useState('');
  const [level, setLevel] = useState('');
  const [objectiveDescription, setObjectiveDescription] = useState('');

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

  const renderExperienceStep = () => {

    function handleContinue() {
      if (
        !position.trim() ||
        !company.trim()
      ) {
        return;
      }

      addExperience({
        id: Date.now().toString(),
        position: position.trim(),
        company: company.trim(),
        startDate: startDate.trim(),
        endDate: endDate.trim(),
        description: description.trim(),
      });

      setCurrentStep(3);
    }

    return (
      <>
        <View style={styles.header}>
          <Text style={styles.step}>
            ETAPA 2 DE 6
          </Text>

          <Text style={styles.title}>
            Experiência profissional
          </Text>

          <Text style={styles.subtitle}>
            Conte sobre suas experiências profissionais.
          </Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.inputLabel}>
            Cargo
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ex.: Desenvolvedor de Software"
            placeholderTextColor="#6F7B88"
            value={position}
            onChangeText={setPosition}
          />

          <Text style={styles.inputLabel}>
            Empresa
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ex.: Empresa XYZ"
            placeholderTextColor="#6F7B88"
            value={company}
            onChangeText={setCompany}
          />

          <Text style={styles.inputLabel}>
            Data de início
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ex.: 01/2024"
            placeholderTextColor="#6F7B88"
            value={startDate}
            onChangeText={setStartDate}
          />

          <Text style={styles.inputLabel}>
            Data de término
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ex.: Atual"
            placeholderTextColor="#6F7B88"
            value={endDate}
            onChangeText={setEndDate}
          />

          <Text style={styles.inputLabel}>
            Descrição
          </Text>

          <TextInput
            style={[
              styles.input,
              styles.textArea,
            ]}
            placeholder="Descreva suas principais atividades e responsabilidades."
            placeholderTextColor="#6F7B88"
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical="top"
          />
        </View>

        <View style={styles.navigationButtons}>
          <Pressable
            style={styles.secondaryButton}
            onPress={() => setCurrentStep(1)}
          >
            <Text style={styles.secondaryButtonText}>
              ← Voltar
            </Text>
          </Pressable>

          <Pressable
            style={styles.primaryButton}
            onPress={handleContinue}
          >
            <Text style={styles.primaryButtonText}>
              Continuar →
            </Text>
          </Pressable>
        </View>
      </>
    );
  };

  const renderEducationStep = () => {

    function handleAddEducation() {
      if (!course.trim() || !institution.trim()) {
        return;
      }

      addEducation({
        id: Date.now().toString(),
        course: course.trim(),
        institution: institution.trim(),
        startDate: educationStartDate.trim(),
        endDate: educationEndDate.trim(),
      });

      setCourse('');
      setInstitution('');
      setEducationStartDate('');
      setEducationEndDate('');

      setCurrentStep(4);
    }

    return (
      <>
        <View style={styles.header}>
          <Text style={styles.step}>
            ETAPA 3 DE 6
          </Text>

          <Text style={styles.title}>
            Formação acadêmica
          </Text>

          <Text style={styles.subtitle}>
            Adicione sua formação e seus estudos.
          </Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.inputLabel}>
            Curso
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ex.: Análise e Desenvolvimento de Sistemas"
            placeholderTextColor="#6F7B88"
            value={course}
            onChangeText={setCourse}
          />

          <Text style={styles.inputLabel}>
            Instituição
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ex.: Universidade Federal"
            placeholderTextColor="#6F7B88"
            value={institution}
            onChangeText={setInstitution}
          />

          <Text style={styles.inputLabel}>
            Data de início
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ex.: 2023"
            placeholderTextColor="#6F7B88"
            value={educationStartDate}
            onChangeText={setEducationStartDate}
            keyboardType="numeric"
          />

          <Text style={styles.inputLabel}>
            Data de conclusão
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ex.: 2026"
            placeholderTextColor="#6F7B88"
            value={educationEndDate}
            onChangeText={setEducationEndDate}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.navigationButtons}>
          <Pressable
            style={styles.secondaryButton}
            onPress={() => setCurrentStep(2)}
          >
            <Text style={styles.secondaryButtonText}>
              ← Voltar
            </Text>
          </Pressable>

          <Pressable
            style={styles.primaryButton}
            onPress={handleAddEducation}
          >
            <Text style={styles.primaryButtonText}>
              Continuar →
            </Text>
          </Pressable>
        </View>
      </>
    );
  };

  const renderSkillsStep = () => {
    function handleAddSkill() {
      const skill = skillInput.trim();

      if (!skill) {
        return;
      }

      addSkill(skill);

      setSkillInput('');
    }

    function handleContinue() {
      setCurrentStep(5);
    }

    return (
      <>
        <View style={styles.header}>
          <Text style={styles.step}>
            ETAPA 4 DE 6
          </Text>

          <Text style={styles.title}>
            Habilidades
          </Text>

          <Text style={styles.subtitle}>
            Adicione as principais habilidades que você possui.
          </Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.inputLabel}>
            Nova habilidade
          </Text>

          <View style={styles.skillInputRow}>
            <TextInput
              style={styles.skillInput}
              placeholder="Ex.: Java, React, Excel..."
              placeholderTextColor="#6F7B88"
              value={skillInput}
              onChangeText={setSkillInput}
              onSubmitEditing={handleAddSkill}
            />

            <Pressable
              style={styles.addSkillButton}
              onPress={handleAddSkill}
            >
              <Text style={styles.addSkillButtonText}>
                +
              </Text>
            </Pressable>
          </View>
        </View>

        {resume.skills.length > 0 && (
          <View style={styles.skillsCard}>
            <Text style={styles.skillsTitle}>
              Suas habilidades
            </Text>

            <View style={styles.skillsList}>
              {resume.skills.map((skill) => (
                <Pressable
                  key={skill}
                  style={styles.skillTagg}
                  onPress={() => removeSkill(skill)}
                >
                  <Text style={styles.skillTagText}>
                    {skill} ×
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        <View style={styles.navigationButtons}>
          <Pressable
            style={styles.secondaryButton}
            onPress={() => setCurrentStep(3)}
          >
            <Text style={styles.secondaryButtonText}>
              ← Voltar
            </Text>
          </Pressable>

          <Pressable
            style={styles.primaryButton}
            onPress={handleContinue}
          >
            <Text style={styles.primaryButtonText}>
              Continuar →
            </Text>
          </Pressable>
        </View>
      </>
    );
  };

  const renderObjectiveStep = () => {
    function handleContinue() {
      updateObjective({
        desiredPosition: desiredPosition.trim(),
        area: area.trim(),
        level: level.trim(),
        description: objectiveDescription.trim(),
      });

      setCurrentStep(6);
    }

    return (
      <>
        <View style={styles.header}>
          <Text style={styles.step}>
            ETAPA 5 DE 6
          </Text>

          <Text style={styles.title}>
            Objetivo profissional
          </Text>

          <Text style={styles.subtitle}>
            Conte qual tipo de oportunidade você está procurando.
          </Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.inputLabel}>
            Cargo desejado
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ex.: Desenvolvedor de Software"
            placeholderTextColor="#6F7B88"
            value={desiredPosition}
            onChangeText={setDesiredPosition}
          />

          <Text style={styles.inputLabel}>
            Área de interesse
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ex.: Tecnologia da Informação"
            placeholderTextColor="#6F7B88"
            value={area}
            onChangeText={setArea}
          />

          <Text style={styles.inputLabel}>
            Nível profissional
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ex.: Júnior, Pleno ou Sênior"
            placeholderTextColor="#6F7B88"
            value={level}
            onChangeText={setLevel}
          />

          <Text style={styles.inputLabel}>
            Descrição do objetivo
          </Text>

          <TextInput
            style={[
              styles.input,
              styles.textAreaa,
            ]}
            placeholder="Descreva brevemente seus objetivos profissionais..."
            placeholderTextColor="#6F7B88"
            value={objectiveDescription}
            onChangeText={setObjectiveDescription}
            multiline
            textAlignVertical="top"
          />
        </View>

        <View style={styles.navigationButtons}>
          <Pressable
            style={styles.secondaryButton}
            onPress={() => setCurrentStep(4)}
          >
            <Text style={styles.secondaryButtonText}>
              ← Voltar
            </Text>
          </Pressable>

          <Pressable
            style={styles.primaryButton}
            onPress={handleContinue}
          >
            <Text style={styles.primaryButtonText}>
              Revisar currículo →
            </Text>
          </Pressable>
        </View>
      </>
    );
  };

  const renderReviewStep = () => {
    return (
      <>
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

            <Pressable
              onPress={() => setCurrentStep(1)}
            >
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

        {/* EXPERIÊNCIAS */}

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

            <Pressable
              onPress={() => setCurrentStep(2)}
            >
              <Text style={styles.editText}>
                Editar
              </Text>
            </Pressable>
          </View>

          <View style={styles.divider} />

          {resume.experiences.length > 0 ? (
            resume.experiences.map((experience) => (
              <View
                key={experience.id}
                style={styles.reviewItem}
              >
                <Text style={styles.jobTitle}>
                  {experience.position}
                </Text>

                <Text style={styles.company}>
                  {experience.company}
                </Text>

                <Text style={styles.period}>
                  {experience.startDate || 'Não informado'}
                  {' — '}
                  {experience.endDate || 'Atual'}
                </Text>

                {!!experience.description && (
                  <Text style={styles.description}>
                    {experience.description}
                  </Text>
                )}
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>
              Nenhuma experiência adicionada.
            </Text>
          )}
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

            <Pressable
              onPress={() => setCurrentStep(3)}
            >
              <Text style={styles.editText}>
                Editar
              </Text>
            </Pressable>
          </View>

          <View style={styles.divider} />

          {resume.education.length > 0 ? (
            resume.education.map((education) => (
              <View
                key={education.id}
                style={styles.reviewItem}
              >
                <Text style={styles.jobTitle}>
                  {education.course}
                </Text>

                <Text style={styles.company}>
                  {education.institution}
                </Text>

                <Text style={styles.period}>
                  {education.startDate || 'Não informado'}
                  {' — '}
                  {education.endDate || 'Não informado'}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>
              Nenhuma formação adicionada.
            </Text>
          )}
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

            <Pressable
              onPress={() => setCurrentStep(4)}
            >
              <Text style={styles.editText}>
                Editar
              </Text>
            </Pressable>
          </View>

          <View style={styles.divider} />

          {resume.skills.length > 0 ? (
            <View style={styles.skillsList}>
              {resume.skills.map((skill) => (
                <View
                  key={skill}
                  style={styles.skillTag}
                >
                  <Text style={styles.skillTagText}>
                    {skill}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.emptyText}>
              Nenhuma habilidade adicionada.
            </Text>
          )}
        </View>

        {/* OBJETIVO PROFISSIONAL */}

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

            <Pressable
              onPress={() => setCurrentStep(5)}
            >
              <Text style={styles.editText}>
                Editar
              </Text>
            </Pressable>
          </View>

          <View style={styles.divider} />

          <Text style={styles.jobTitle}>
            {resume.objective.desiredPosition ||
              'Cargo não informado'}
          </Text>

          <Text style={styles.company}>
            {resume.objective.area ||
              'Área não informada'}
          </Text>

          <Text style={styles.period}>
            {resume.objective.level ||
              'Nível não informado'}
          </Text>

          {!!resume.objective.description && (
            <Text style={styles.description}>
              {resume.objective.description}
            </Text>
          )}

          {!resume.objective.desiredPosition &&
            !resume.objective.area &&
            !resume.objective.level &&
            !resume.objective.description && (
              <Text style={styles.emptyText}>
                Nenhum objetivo profissional informado.
              </Text>
            )}
        </View>

        {/* NAVEGAÇÃO */}

        <View style={styles.navigationButtons}>
          <Pressable
            style={styles.secondaryButton}
            onPress={() => setCurrentStep(5)}
          >
            <Text style={styles.secondaryButtonText}>
              ← Voltar
            </Text>
          </Pressable>

          <Pressable
            style={styles.primaryButton}
            onPress={() => {
              saveResume(resume);
              console.log('Currículo salvo com sucesso');
            }}
          >
            <Text style={styles.primaryButtonText}>
              Finalizar currículo ✓
            </Text>
          </Pressable>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {currentStep === 1 && renderPersonalStep()}

        {currentStep === 2 && renderExperienceStep()}

        {currentStep === 3 && renderEducationStep()}

        {currentStep === 4 && renderSkillsStep()}

        {currentStep === 5 && renderObjectiveStep()}

        {currentStep === 6 && renderReviewStep()}
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

  textArea: {
    height: 120,
    paddingTop: 14,
  },

  navigationButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },

  secondaryButton: {
    flex: 1,
    minHeight: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#28313C',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111820',
  },

  secondaryButtonText: {
    color: '#F5B942',
    fontSize: 15,
    fontWeight: '700',
  },

  skillInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  skillInput: {
    flex: 1,
    backgroundColor: '#111820',
    borderWidth: 1,
    borderColor: '#28313C',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    color: '#FFFFFF',
  },

  addSkillButton: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: '#F5B942',
    alignItems: 'center',
    justifyContent: 'center',
  },

  addSkillButtonText: {
    color: '#0B0F14',
    fontSize: 28,
    fontWeight: '700',
  },

  skillsCard: {
    backgroundColor: '#111820',
    borderRadius: 16,
    padding: 18,
    marginTop: 16,
  },

  skillsTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 14,
  },

  skillsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  skillTagg: {
    backgroundColor: '#1B2632',
    borderWidth: 1,
    borderColor: '#28313C',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
  },

  skillTagText: {
    color: '#F5B942',
    fontSize: 14,
    fontWeight: '600',
  },

  textAreaa: {
    height: 130,
    paddingTop: 16,
  },

  reviewItem: {
    marginBottom: 18,
  },

  emptyText: {
    color: '#6F7B88',
    fontSize: 14,
    lineHeight: 20,
  },
});